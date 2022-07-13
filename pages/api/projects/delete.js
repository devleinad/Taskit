import { ObjectId } from "mongodb";
import { connect } from "../../../lib/database/connection";
import { authenticate } from "../../../middleware/authenticate";

export default async function handler(req,res){
    const {isAuthenticated,user} = await authenticate(req);

    if(isAuthenticated){
        if(req.method === "DELETE"){
        const db = await connect();
        const {projects} = req.body;
        projects.forEach((projectId) => {
            db.collection('projects').deleteMany({user_id:ObjectId(user?._id),_id:ObjectId(projectId)});
        });
        
         return res.status(201).json({success:true});
        }else{
            res.status(405);
        }
       
       
    }else{
        return res.status(401).json({error:'Unauthenticated'});
    }
}