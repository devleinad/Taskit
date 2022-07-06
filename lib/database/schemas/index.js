import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    fullName:String,
    email:{type:String,unique:true},
    companyName:String,
    password:String,
    avatar:{type:String,default:null},
    isActive:{type:Boolean,default:true},
    userType:{type:String,default:'normal'},
    createdAt:{type:Date, default: Date.now},
    updatedAt:{type:Date, default: Date.now},
});