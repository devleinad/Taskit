import axios from "axios";
import { connect } from "../lib/database/connection";

export const isEmpty = (str) => {
  return !str.trim().length;
};

export const isConfirmed = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const checkEmailAvailability = async (email) => {
  const dbConnection = await connect();
  if (dbConnection.readyState) {
    const emailFound = await dbConnection
      .collection("users")
      .findOne({ email });
    console.log(emailFound);
    return emailFound ? true : false;
  }
};

export const getAllUserProjects = async (
  page,
  status,
  order_by,
  sort_in,
  searchTerm
) => {
  const apiResponse = await axios.get(
    `/api/projects/?page=${Number(
      page
    )}&status=${status}&order_by=${order_by}&sort_in=${sort_in}&q=${searchTerm}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "/",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    }
  );
  return apiResponse;
};

export const createProject = (data) => {
  const apiResponse = axios.post("/api/projects/create", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "/",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "POST",
    },
  });
  return apiResponse;
};

export const updateProject = (url, data) => {
  const apiResponse = axios.patch(url, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "/",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "PATCH",
    },
  });
  return apiResponse;
};

export const createTask = (url, data) => {
  const apiResponse = axios.post(url, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "/",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "POST",
    },
  });
  return apiResponse;
};

export const updateTask = (url, task) => {
  const apiResponse = axios.patch(url, task, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "/",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "PATCH",
    },
  });
  return apiResponse;
};

export const deleteProject = (data) => {
  const apiResponse = axios.delete(`/api/projects/delete`, {
    data: JSON.stringify(data),
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "/",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE",
    },
  });
  return apiResponse;
};

export const deleteTask = (url, data) => {
  const apiResponse = axios.delete(url, {
    data: JSON.stringify(data),
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "/",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE",
    },
  });
  return apiResponse;
};

// export const updateProjectTitleOrDescription = (id, data) => {
//   const apiResponse = axios.put(`/api/projects/${id}`, data, {
//     withCredentials: true,
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "/",
//       "Access-Control-Allow-Headers": "*",
//       "Access-Control-Allow-Methods": "PUT",
//     },
//   });
//   return apiResponse;
// };
// export const updateTaskTitleOrDescription = (id, data) => {
//   const apiResponse = axios.put(`/api/task/${id}`, data, {
//     withCredentials: true,
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "/",
//       "Access-Control-Allow-Headers": "*",
//       "Access-Control-Allow-Methods": "PUT",
//     },
//   });
//   return apiResponse;
// };
