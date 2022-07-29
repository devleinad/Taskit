import { ObjectId } from "mongodb";
import { isEmpty } from "../../../../helpers";
import { connect } from "../../../../lib/database/connection";
import { authenticate } from "../../../../middleware/authenticate";

export default async function handler(req, res) {
  const {
    isAuthenticated,
    user,
    status: statusCode,
    message: errorMessage,
  } = await authenticate(req);

  if (isAuthenticated) {
    const db = await connect();
    const { projectId } = req.query;
    if (req.method === "PATCH") {
      const { title, description, status, dueDate, repColor } = req.body;
      //the title field cannot be left empty
      if (isEmpty(title)) {
        return res.status(422);
      } else {
        // we cannot allow duplicate project titles, unless it is the same project that we are updating
        const isDuplicateProject = await db.collection("projects").findOne({
          user_id: ObjectId(user?._id),
          title,
          _id: { $ne: ObjectId(projectId) },
        });
        if (isDuplicateProject) {
          return res.status(423);
        } else {
          const updateProject = await db.collection("projects").updateOne(
            {
              _id: ObjectId(projectId),
              user_id: ObjectId(user?._id),
            },
            {
              $set: {
                title,
                description,
                repColor,
                dueDate,
                status,
                updatedAt: new Date().toString(),
              },
            }
          );
          if (updateProject.modifiedCount > 0) {
            const updatedProject = await db
              .collection("projects")
              .findOne({
                _id: ObjectId(projectId),
                user_id: ObjectId(user?._id),
              });
            return res.status(201).json({ updatedProject });
          } else {
            res.status(500);
          }
        }
      }
    }

    if (req.method === "DELETE") {
      const { projects } = req.body;
      projects.forEach((projectId) => {
        db.collection("projects").deleteMany({
          user_id: ObjectId(user?._id),
          _id: ObjectId(projectId),
        });
      });

      return res.status(201).json({ success: true });
    }
  } else {
    return res.status(statusCode).json({ message: errorMessage });
  }
}
