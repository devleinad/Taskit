import { ObjectId } from "mongodb";
import { connect } from "../../lib/database/connection";
import { authenticate } from "../../middleware/authenticate";
export default async function handler(req, res) {
  const { isAuthenticated, user } = await authenticate(req);
  if (isAuthenticated) {
    const db = await connect();
    const userProjects = await db
      .collection("projects")
      .countDocuments({ user_id: ObjectId(user?._id) });

    res.status(200).json({
      userProjectsCount: userProjects,
    });
  } else {
    return res.status(401).json({ message: "Unauthenticated" });
  }
}
