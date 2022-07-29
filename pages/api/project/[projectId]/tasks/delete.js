import { ObjectId } from "mongodb";
import { connect } from "../../../../../lib/database/connection";
import { authenticate } from "../../../../../middleware/authenticate";

ObjectId;

export default async function handler(req, res) {
  const {
    isAuthenticated,
    user,
    status: statusCode,
    message: errorMessage,
  } = await authenticate(req);

  if (isAuthenticated) {
    const db = await connect();
    const { tasks } = req.body;
    tasks.forEach((taskId) => {
      db.collection("tasks").deleteMany({
        _id: ObjectId(taskId),
        project_id: ObjectId(req.query.projectId),
      });
    });

    return res.status(201).json({ success: true });
  } else {
    return res.status(statusCode).json({ message: errorMessage });
  }
}
