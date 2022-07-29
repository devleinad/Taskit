import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";
import { connect } from "../lib/database/connection";

export const authenticate = async (req) => {
  const session = await getSession({ req });
  if (session?.user) {
    //check if user exists in the database
    const db = await connect();
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(session?.user?._id) });
    if (user) {
      return {
        isAuthenticated: true,
        user: session?.user,
        status: 200,
      };
    } else {
      return {
        isAuthenticated: false,
        user: null,
        status: 500,
        message: "Something went wrong",
      };
    }
  } else {
    return {
      isAuthenticated: false,
      user: null,
      status: 401,
      message: "Unauthenticated",
    };
  }
};
