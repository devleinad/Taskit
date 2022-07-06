import { ObjectId } from "mongodb";
import { connect } from "../../../lib/database/connection";
import { authenticate } from "../../../middleware/authenticate";

export default async function handler(req,res){
    const {isAuthenticated,user} = await authenticate(req);
    if(isAuthenticated){
        const db = await connect();
        const {status,sort_order,sort_by,q} = req.query;

        let convertedSortOrder,projects;

        switch(sort_order){
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
        if(!q){
            //we must fetch both active and completed statuses if the status query === all, else fetch either active or completed base on what is passed
            if(status === "all"){
                projects = await db.collection('projects').aggregate([{$match:{user_id:ObjectId(user?._id),status:{$in:['Active','Completed']}}},{$sort:{[sort_by]:convertedSortOrder}}]).toArray();
            }else{
                projects = await db.collection('projects').aggregate([{$match:{user_id:ObjectId(user?._id),status}},{$sort:{[sort_by]:convertedSortOrder}}]).toArray();
            }
        }else{
            if(status === "all"){
                projects = await db.collection('projects').find({user_id:ObjectId(user?._id),status:{$in:['Active','Completed']},$or:[{title:{$regex:`${q}`,$options:'i'}},{description:{$regex:`${q}`,$options:'i'}},{status:{$regex:`${q}`,$options:'i'}},{dueDate:{$regex:`${q}`,$options:'i'}}]}).sort({[sort_by]:convertedSortOrder}).toArray();
            }else{
                projects = await db.collection('projects').find({user_id:ObjectId(user?._id),status,$or:[{title:{$regex:`${q}`,$options:'i'}},{description:{$regex:`${q}`,$options:'i'}},{status:{$regex:`${q}`,$options:'i'}},{dueDate:{$regex:`${q}`,$options:'i'}}]}).sort({[sort_by]:convertedSortOrder}).toArray();
            }
        }

        return res.status(200).json({projects});
    }else{
        return res.status(401).json({error:'Unauthenticated'});
    }
}