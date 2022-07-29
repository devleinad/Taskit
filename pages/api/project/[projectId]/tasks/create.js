import { ObjectId } from "mongodb";
import { connect } from "../../../../../lib/database/connection";
import { authenticate } from "../../../../../middleware/authenticate";
export default async function handler(req, res) {
  const { projectId } = req.query;
  const {
    assignees,
    assigned_by,
    task_title,
    task_description,
    status,
    dueDate,
    attachments,
  } = req.body;

  const {
    isAuthenticated,
    status: statusCode,
    message: errorMessage,
  } = await authenticate(req);
  if (isAuthenticated) {
    const db = await connect();
    //check project existence
    const project = await db
      .collection("projects")
      .findOne({ _id: ObjectId(projectId) });
    if (project) {
      const createTask = await db.collection("tasks").insertOne({
        project_id: ObjectId(projectId),
        assigned_by: ObjectId(assigned_by),
        task_title,
        task_description,
        status,
        dueDate,
        assignees,
        attachments,
        createdAt: new Date().toLocaleString(),
        updateAt: new Date().toLocaleString(),
      });
      if (createTask.acknowledged) {
        const task = await db
          .collection("tasks")
          .findOne({ _id: ObjectId(createTask?.insertedId) });
        return res.status(201).json({ success: true, task });
      } else {
        return res.status(500).json({ message: "Something went wrong" });
      }
    } else {
      return res.status(500).json({ message: "Project does not exist." });
    }
  } else {
    res.status(statusCode).json({ message: errorMessage });
  }
}
