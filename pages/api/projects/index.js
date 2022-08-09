import { ObjectId } from "mongodb";
import { connect } from "../../../lib/database/connection";
import { authenticate } from "../../../middleware/authenticate";

export default async function handler(req, res) {
  const { isAuthenticated, user } = await authenticate(req);
  if (isAuthenticated) {
    const db = await connect();
    const { page, status, order_by, sort_in, q } = req.query;

    let convertedSortOrder, projects;

    switch (sort_in) {
      case "desc":
        convertedSortOrder = -1;
        break;
      case "asc":
        convertedSortOrder = 1;
        break;
      default:
        convertedSortOrder = -1;
    }

    //if no query/search term is passed
    const totalUserProjectsCount = await db
      .collection("projects")
      .countDocuments({
        user_id: ObjectId(user?._id),
      });

    // .collection("projects")
    // .find({ user_id: ObjectId(user?._id) })
    // .count();
    const maxNumberOfProjectsPerPage = 8;
    const offset = (page - 1) * maxNumberOfProjectsPerPage;

    if (!q) {
      //we must fetch both active and completed statuses if the status query === all, else fetch either active or completed base on what is passed
      if (status === "all") {
        projects = await db
          .collection("projects")
          .aggregate([
            {
              $match: {
                user_id: ObjectId(user?._id),
              },
            },

            {
              $sort: { [order_by]: convertedSortOrder },
            },

            {
              $lookup: {
                from: "users",

                let: { userId: "$user_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$userId"],
                      },
                    },
                  },
                  {
                    $project: {
                      password: 0,
                      email: 0,
                      createdAt: 0,
                      updatedAt: 0,
                      createdAt: 0,
                      userType: 0,
                      isActive: 0,
                      companyName: 0,
                    },
                  },
                ],
                as: "creator",
              },
            },

            { $unwind: "$creator" },
          ])
          .skip(offset)
          .limit(maxNumberOfProjectsPerPage)
          .toArray();
      } else {
        projects = await db
          .collection("projects")
          .aggregate([
            {
              $match: {
                user_id: ObjectId(user?._id),
                status,
              },
            },

            {
              $sort: { [order_by]: convertedSortOrder },
            },

            {
              $lookup: {
                from: "users",

                let: { userId: "$user_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$userId"],
                      },
                    },
                  },
                  {
                    $project: {
                      password: 0,
                      email: 0,
                      createdAt: 0,
                      updatedAt: 0,
                      createdAt: 0,
                      userType: 0,
                      isActive: 0,
                      companyName: 0,
                    },
                  },
                ],
                as: "creator",
              },
            },
            { $unwind: "$creator" },
          ])
          .skip(offset)
          .limit(maxNumberOfProjectsPerPage)
          .toArray();
      }
    } else {
      if (status === "all") {
        projects = await db
          .collection("projects")
          .aggregate([
            {
              $match: {
                user_id: ObjectId(user?._id),
                $or: [
                  { title: { $regex: `${q}`, $options: "i" } },
                  { description: { $regex: `${q}`, $options: "i" } },
                  { status: { $regex: `${q}`, $options: "i" } },
                  { dueDate: { $regex: `${q}`, $options: "i" } },
                ],
              },
            },
            {
              $sort: { [order_by]: convertedSortOrder },
            },
            {
              $lookup: {
                from: "users",
                let: { userId: "$user_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$userId"],
                      },
                    },
                  },
                  {
                    $project: {
                      password: 0,
                      email: 0,
                      createdAt: 0,
                      updatedAt: 0,
                      createdAt: 0,
                      userType: 0,
                      isActive: 0,
                      companyName: 0,
                    },
                  },
                ],
                as: "creator",
              },
            },
            { $unwind: "$creator" },
          ])
          .skip(offset)
          .limit(maxNumberOfProjectsPerPage)
          .toArray();
      } else {
        projects = await db
          .collection("projects")
          .aggregate([
            {
              $match: {
                user_id: ObjectId(user?._id),
                $or: [
                  { title: { $regex: `${q}`, $options: "i" } },
                  { description: { $regex: `${q}`, $options: "i" } },
                  { status: { $regex: `${q}`, $options: "i" } },
                  { dueDate: { $regex: `${q}`, $options: "i" } },
                ],
                status,
              },
            },
            {
              $sort: { [order_by]: convertedSortOrder },
            },
            {
              $lookup: {
                from: "users",
                let: { userId: "$user_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$userId"],
                      },
                    },
                  },
                  {
                    $project: {
                      password: 0,
                      email: 0,
                      createdAt: 0,
                      updatedAt: 0,
                      createdAt: 0,
                      userType: 0,
                      isActive: 0,
                      companyName: 0,
                    },
                  },
                ],
                as: "creator",
              },
            },
            { $unwind: "$creator" },
          ])
          .skip(offset)
          .limit(maxNumberOfProjectsPerPage)
          .toArray();
      }
    }
    return res.status(200).json({ totalUserProjectsCount, page, projects });
  } else {
    return res.status(401).json({ error: "Unauthenticated" });
  }
}
