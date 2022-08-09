import { ObjectId } from "mongodb";
import { isEmpty } from "../../../helpers";
import { connect } from "../../../lib/database/connection";
import { authenticate } from "../../../middleware/authenticate";

export default async function handler(req, res) {
  const { isAuthenticated, user } = await authenticate(req);
  if (isAuthenticated) {
    const db = await connect();
    const { title, repColor, status, dueDate, description } = req.body;
    if (isEmpty(title)) {
      return res.status(422);
    } else {
      //we must avoid duplicate project titles
      const projectExists = await db
        .collection("projects")
        .findOne({ user_id: ObjectId(user._id), title });
      if (projectExists) {
        return res.status(423);
      } else {
        const newProject = await db.collection("projects").insertOne({
          user_id: ObjectId(user._id),
          title,
          repColor,
          status,
          dueDate,
          description,
          createdAt: new Date().toString(),
          updateAt: new Date().toString(),
          tasksCount: 0,
        });

        if (newProject.acknowledged) {
          const project = await db
            .collection("projects")
            .findOne({ _id: ObjectId(newProject.insertedId.toString()) });
          return res.status(201).json({ success: true, project });
        } else {
          return res.status(501).json({ success: false, project: null });
        }
      }
    }
  } else {
    return res.status(401).json({ error: "Unauthenticated" });
  }
}
