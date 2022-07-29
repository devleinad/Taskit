import { connect } from "../../../../lib/database/connection";
import { authenticate } from "../../../../middleware/authenticate";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { projectId } = req.query;
  const { isAuthenticated, user } = await authenticate(req);
  if (isAuthenticated) {
    const db = await connect();
    const project = await db
      .collection("projects")
      .findOne({ _id: ObjectId(projectId), user_id: ObjectId(user?._id) });

    if (project) {
      const { page, status, sort_order, sort_by, q } = req.query;

      let convertedSortOrder, projects;

      switch (sort_order) {
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
      const totalProjectTasksCount = await db
        .collection("tasks")
        .countDocuments({
          project_id: ObjectId(projectId),
        });

      // .collection("projects")
      // .find({ user_id: ObjectId(user?._id) })
      // .count();
      const maxNumberOfTasksPerPage = 10;
      const offset = Math.floor((page - 1) * maxNumberOfTasksPerPage);
      let projectTasks;

      if (!q) {
        //we must fetch both active and completed statuses if the status query === all, else fetch either active or completed base on what is passed
        if (status === "all") {
          projectTasks = await db
            .collection("tasks")
            .aggregate([
              {
                $match: {
                  project_id: ObjectId(projectId),
                },
              },

              {
                $sort: { [sort_by]: convertedSortOrder },
              },

              {
                $lookup: {
                  from: "users",

                  let: { userId: "$assigned_by" },
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
            .limit(9)
            .toArray();
        } else {
          projectTasks = await db
            .collection("tasks")
            .aggregate([
              {
                $match: {
                  project_id: ObjectId(projectId),
                  status,
                },
              },

              {
                $sort: { [sort_by]: convertedSortOrder },
              },

              {
                $lookup: {
                  from: "users",

                  let: { userId: "$assigned_by" },
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
            .limit(9)
            .toArray();
        }
      } else {
        if (status === "all") {
          projectTasks = await db
            .collection("tasks")
            .aggregate([
              {
                $match: {
                  project_id: ObjectId(projectId),
                  $or: [
                    { task_title: { $regex: `${q}`, $options: "i" } },
                    { task_description: { $regex: `${q}`, $options: "i" } },
                    { status: { $regex: `${q}`, $options: "i" } },
                    { dueDate: { $regex: `${q}`, $options: "i" } },
                  ],
                },
              },
              {
                $sort: { [sort_by]: convertedSortOrder },
              },
              {
                $lookup: {
                  from: "users",
                  let: { userId: "$assigned_by" },
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
            .limit(9)
            .toArray();
        } else {
          projectTasks = await db
            .collection("tasks")
            .aggregate([
              {
                $match: {
                  project_id: ObjectId(projectId),
                  $or: [
                    { task_title: { $regex: `${q}`, $options: "i" } },
                    { task_description: { $regex: `${q}`, $options: "i" } },
                    { status: { $regex: `${q}`, $options: "i" } },
                    { dueDate: { $regex: `${q}`, $options: "i" } },
                  ],
                  status,
                },
              },
              {
                $sort: { [sort_by]: convertedSortOrder },
              },
              {
                $lookup: {
                  from: "users",
                  let: { userId: "$assigned_by" },
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
            .limit(9)
            .toArray();
        }
      }

      return res
        .status(200)
        .json({ project, tasks: projectTasks, totalProjectTasksCount });
    } else {
      return res.status(404).json({ message: "Project not found" });
    }
  } else {
    return res.json(401).json({ message: "Unauthenticated" });
  }
}
