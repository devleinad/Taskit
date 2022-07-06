
import axios from "axios";
import {connect} from "../lib/database/connection";

export const isEmpty = (str) => {
    return !str.trim().length;
}


export const isConfirmed = (password,confirmPassword) => {
    return password === confirmPassword;
}



export const checkEmailAvailability = async (email) => {
    const dbConnection = await connect();
    if(dbConnection.readyState){
        const emailFound = await dbConnection.collection('users').findOne({email});
        console.log(emailFound);
         return emailFound ? true : false;
    }
  
}


export const getAllUserProjects = async (status,sortOrder,sortBy,searchTerm) => {
   const apiResponse = await axios.get(`http://localhost:3000/api/projects/?status=${status}&sort_order=${sortOrder}&sort_by=${sortBy}&q=${searchTerm}`,{
       withCredentials:true,
        headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':"http://localhost:3000/",
                'Access-Control-Allow-Headers':'*',
                'Access-Control-Allow-Methods':'GET'
            }
   });
    return apiResponse;
}

export const createProject = (data) => {
    const apiResponse = axios.post('http://localhost:3000/api/projects/create',data,{
        withCredentials:true,
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':"http://localhost:3000/",
                'Access-Control-Allow-Headers':'*',
                'Access-Control-Allow-Methods':'METHOD'
            }
    });
    return apiResponse;
}


export const deleteProject = (data) => {
    const apiResponse = axios.delete(`http://localhost:3000/api/projects/delete`,{
        data:JSON.stringify(data),
        withCredentials:true,
        headers:{
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':"*"
        }
    });
    return apiResponse;
}


export const updateProjectTitleOrDescription = (id,data) => {
    const apiResponse = axios.patch(`http://localhost:3000/api/projects/${id}`,data,{
        withCredentials:true,
        headers:{
            'Access-Control-Allow-Origin':"*"
        }
    });
    return apiResponse;
}

// export const signup = async (req,res) => {
//     const {fullName,email,companyName,password,confirmPassword} = req.body;
//     const connect = await connect();
//     if(connect){
//         const newUser = new User({
//             fullName,
//             email,
//             companyName,
//             password,

//         })
//     }
// }