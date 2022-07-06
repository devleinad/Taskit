import { getSession } from "next-auth/react"

export const authenticate = async (req) => {
    const session = await getSession({req});
    if(session.user){
        return {
            isAuthenticated:true,
            user:session.user
        }
    }else{
        return {
            isAuthenticated:false,
            user:null
        }
    }
}