import bcryptjs from "bcryptjs";
import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import { connect } from "../../../lib/database/connection";

export default NextAuth({
    session:{
        jwt:true
    },
    jwt:{
        secret:process.env.NEXTAUTH_SECRET
    },
    providers:[
        CredentialsProvider({
            name:"Credentials",
            async authorize(credentials){
                const {email,password} = credentials;
                const db = await connect();
                if(db.readyState){

                    const foundUser = await db.collection('users').findOne({email});
                    if(foundUser){
                        const passwordMatches = bcryptjs.compareSync(password,foundUser.password);
                        if(passwordMatches){
                            return foundUser;
                        }else{
                            throw new Error('Wrong email/password combination');
                        }
                    }else{
                        throw new Error('No such user!')
                    }
                }
            }
        })
    ],
    callbacks:{
        jwt:({token,user}) => {
            if(user){
                token.id = user?._id;
                token._id = token.id;
                token.name = user?.fullName;
                token.email = user?.email;
                token.companyName = user?.companyName;
                token.avatar = user?.avatar;
                token.userType = user?.userType
                
            }
            return token;
        },
        session:({session,token}) => {
            if(token){
                session.user._id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.companyName = token.companyName;
                session.user.avatar = token.avatar;
                session.user.userType = token.userType
            }

            return session;
        }
    }
});