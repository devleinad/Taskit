import bcryptjs from "bcryptjs";
import { isConfirmed,isEmpty} from "../../helpers";
import { connect } from "../../lib/database/connection";
// import { User } from "../../lib/database/models";

export default async function handler (req,res) {
     const {fullName,email,companyName,password,confirmPassword} = req.body;

     //we must not accept empty data from certain fields.
        if(isEmpty(fullName) && isEmpty(email) && isEmpty(password) && isEmpty(confirmPassword)){
            return res.status(422).json({msg:'Only company name is optional! Provide information for the remaining fields.'})
        
            //The two passwords must match
        }else if(!isConfirmed(password,confirmPassword)){
            return res.status(422).json({msg:'The two passwords do not match!'});
        }else {
            //lets open database connection for operations
            const databaseConnection = await connect();
            if(databaseConnection.readyState){
                const emailExists = await databaseConnection.collection('users').findOne({email});
                if(emailExists){
                    return res.status(422).json({msg:'email_taken'});
                }else{
                    const newUser = await databaseConnection.collection('users').insertOne({
                        fullName,
                        email,
                        companyName,
                        password:bcryptjs.hashSync(password,8),
                        avatar:'',
                        isActive:true,
                        userType:'normal',
                        createdAt:new Date().toString(),
                        updatedAt:new Date().toString(),
                    });

                    if(newUser){
                        return res.status(201).json({success:true});
                    }else{
                        return res.status(501).json({success:false});
                    }
                }
            }
            res.status(201);
        }


   
}