import { ObjectId } from "mongodb";
import { connect } from "../../../../../../lib/database/connection";
import { authenticate } from "../../../../../../middleware/authenticate";

export default async function handler(req, res) {
  const { projectId, taskId } = req.query;

  const {
    isAuthenticated,
    status: statusCode,
    message: errorMessage,
  } = await authenticate(req);

  if (isAuthenticated) {
    const db = await connect();

    if (req.method === "PATCH") {
      const { task_title, task_description, status, dueDate } = req.body;

      const updateTask = await db.collection("tasks").updateOne(
        {
          _id: ObjectId(taskId),
          project_id: ObjectId(projectId),
        },
        {
          $set: {
            task_title,
            task_description,
            status,
            dueDate,
            updateAt: new Date().toLocaleString(),
          },
        }
      );
      if (updateTask) {
        const updatedTask = await db
          .collection("tasks")
          .findOne({ _id: ObjectId(taskId), project_id: ObjectId(projectId) });
        return res.status(201).json({ success: true, updatedTask });
      } else {
        return res
          .status(500)
          .json({ message: "Something went wrong. Task update failed" });
      }
    }
    //end of patch

    if (req.method === "DELETE") {
      //
    }
  } else {
    return res.status(statusCode).json({ message: errorMessage });
  }
}
