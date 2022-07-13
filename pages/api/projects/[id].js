import { ObjectId } from "mongodb";
import { isEmpty } from "../../../helpers";
import { connect } from "../../../lib/database/connection";
import { authenticate } from "../../../middleware/authenticate";

export default async function handler(req,res){
    const {isAuthenticated,user} = await authenticate(req);

    if(isAuthenticated){

        const db = await connect();
        const {id:projectId} = req.query;

        switch(req.method){

            case "PATCH":
                const {title,description,status,dueDate,repColor} = req.body;
                //the title field cannot be left empty
                if(isEmpty(title)){
                    return res.status(422);
                }
                else{
                    // we cannot allow duplicate project titles, unless it is the same project that we are updating
                    const isDuplicateProject = await db.collection('projects').findOne({user_id:ObjectId(user?._id),title, _id:{$ne: ObjectId(projectId)}});
                    if(isDuplicateProject){
                        return res.status(423);
                    }else{
                        const updateProject = await db.collection('projects').updateOne({
                            _id:ObjectId(projectId),
                            user_id:ObjectId(user?._id)},
                            {$set:{
                                title,
                                description,
                                repColor,
                                dueDate,
                                status,
                                updatedAt:new Date().toString()}});
                            if(updateProject.modifiedCount > 0){
                                const updatedProject = await db.collection('projects').findOne({_id:ObjectId(projectId)});
                                console.log(updatedProject);
                                return res.status(201).json({updatedProject});
                            }else{
                                res.status(500);
                            }
                        
                    }
                }
                break;

            case "PUT":
                const data = req.body;
                const updateProject = await db.collection('projects').updateOne({_id:ObjectId(req.query.id)},{$set:data});
                if(updateProject.modifiedCount > 0) {
                    return res.status(200).json({success:true});
                }else{
                     return res.status(501).json({success:false});
                }


        }
    }
}