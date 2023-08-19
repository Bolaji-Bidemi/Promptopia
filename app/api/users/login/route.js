import { connectToDB } from "@utils/database";
import bcryptjs from 'bcryptjs'
import Register from "@models/registerSchema";
import jwt from 'jsonwebtoken'


export const POST = async(req, res) =>{
  const reqBody = await req.json();
  const { email, password } = reqBody;
  try{
    await connectToDB();
    

  const userExist = await Register.findOne({ email });

  if (!userExist) {
    return new Response(JSON.stringify({error : "User does not exist"}, {status: 400}))
  }
  const passwordMatch = await bcryptjs.compare(password, userExist.password)

    
  if (!passwordMatch) {
    return new Response(JSON.stringify({error : "Password is incorrect"}, {status: 400}))
  }

  const tokenData = {
    id: userExist._id,
    email: userExist.email,
  }

  const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET, {
    expiresIn: '1d'
  })


  const response = new Response(JSON.stringify({
    message: `${userExist.username} Logged successfully`,
    user: userExist,
  myToken: token
  }),
    {status: 200}
  )
   //response.setHeader('Set-Cookie', `mytoken=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}`);
   response.headers.set("Set-Cookie", `mytoken=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}`);
    return response

  }catch(error){
    return new Response(JSON.stringify({error:'Invalid Credentials'}), {status: 500})
  }
}