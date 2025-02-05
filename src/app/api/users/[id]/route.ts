import { connectToDatabase } from "@/lib/mongodb";
import UserSchema from "@/models/UserSchema";
import {NextRequest,NextResponse} from "next/server";
//import { ObjectId } from "mongoose";

//get particular id
export async function GET(req: NextRequest, { params }: { params: { id: string } }){
    await connectToDatabase();
    try{
        const user = await UserSchema.findById(params.id);
        if(!user){
            return NextResponse.json({ error: "Not Found" }, { status: 404 });
        }
        return NextResponse.json(user, {status:200});
    }catch(error){
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}


//update user by id
export async function PUT(req: NextRequest, {params} : {params: {id: string}}){
    await connectToDatabase();
    try {
        const data = await req.json();
        const updatedUser = await UserSchema.findByIdAndUpdate(params.id, data, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ error: "Not Found" }, { status: 404 });
        }
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: error.message || "Failed to update user" }, { status: 500 });
    }
}

//delete user by id
export async function DELETE(req: NextRequest, {params} : {params: {id: string}}){
    await connectToDatabase();
    try {
        const deletedUser = await UserSchema.findByIdAndDelete(params.id);
        if (!deletedUser) {
            return NextResponse.json({ error: "Not Found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: error.message || "Failed to delete user" }, { status: 500 });
    }
}