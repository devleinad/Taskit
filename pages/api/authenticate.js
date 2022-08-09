import { authenticate } from "../../middleware/authenticate";
export default async function handler(req, res) {
  const { isAuthenticated, user } = await authenticate(req);
  if (isAuthenticated) {
    return res.json({ success: true, user });
  } else {
    return res.status(401).json({ success: false, user: null });
  }
}
