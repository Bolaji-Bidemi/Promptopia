import { connectToDB } from "@utils/database";
import Register from "@models/registerSchema";


export async function GET(){
    try{
        await connectToDB()
        const user = await Register.find({})
        return new Response(JSON.stringify({user}), {status: 200})
    }catch(error){
        return new Response(JSON.stringify({error: error.message}), {status: 500})
    }
}