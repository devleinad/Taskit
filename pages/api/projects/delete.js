import { ObjectId } from "mongodb";
import { connect } from "../../../lib/database/connection";
import { authenticate } from "../../../middleware/authenticate";

export default async function handler(req, res) {
  const {
    isAuthenticated,
    user,
    status: statusCode,
    message: errorMessage,
  } = await authenticate(req);

  if (isAuthenticated) {
    const db = await connect();
    const { projects } = req.body;
    projects.forEach((projectId) => {
      db.collection("projects").deleteMany({
        user_id: ObjectId(user?._id),
        _id: ObjectId(projectId),
      });
    });

    return res.status(201).json({ success: true });
  } else {
    return res.status(statusCode).json({ message: errorMessage });
  }
}
