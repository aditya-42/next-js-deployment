import { connectToDatabase } from "@/lib/mongodb";
import UserSchema from "@/models/UserSchema";
import {NextRequest,NextResponse} from "next/server";

import bcrypt from "bcryptjs";


//get all users
export  async function GET(){
    await connectToDatabase();
    try{
        const users = await UserSchema.find();
        return NextResponse.json(users, {status:200});
    }catch(error){
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    } 
}


//post request

export async function POST(req: NextRequest) {
  await connectToDatabase();
  try {
      const data = await req.json();
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
      const newUser = await UserSchema.create(data);
      return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
      console.error("Error creating user:", error); 
      return NextResponse.json({ error: error.message || "Failed to create user" }, { status: 500 });
  }
}


