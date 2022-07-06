import { ObjectId } from "mongodb";
import { connect } from "../../../lib/database/connection";
import { authenticate } from "../../../middleware/authenticate";

export default async function handler(req,res){
    const {isAuthenticated,user} = await authenticate(req);

    if(isAuthenticated){

        const db = await connect();
        const {id:projectId} = req.query;

        switch(req.method){

            case "DELETE":
                const deleteProject = await db.collection('projects').deleteOne({user_id:ObjectId(user?._id),_id:ObjectId(projectId)});
                if(deleteProject.deletedCount > 0){
                    return res.status(201).json({success:true});
                }else{
                     return res.status(501).json({success:false});
                }
            
            case "PATCH":
                const data = req.body;
                const updateProject = await db.collection('projects').updateOne({_id:ObjectId(req.query.id)},{$set:data});
                if(updateProject.modifiedCount > 0) {
                    return res.status(201).json({success:true});
                }else{
                     return res.status(501).json({success:false});
                }


        }
    }
}