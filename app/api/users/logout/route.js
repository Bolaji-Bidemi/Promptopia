import Cookies from 'js-cookie'


export async function GET(){
    try{
        
        
        const response = new Response(JSON.stringify({message: "User logged out successfully"}), {status: 200})
        // response.headers.set("Set-Cookie", `auth_token=; HttpOnly; Max-Age=${0}`);
        // response.headers.set("Set-Cookie", `username=; HttpOnly; Path=/; Max-Age=${0}`);
        // response.headers.set("Set-Cookie", `email=; HttpOnly; Path=/; Max-Age=${0}`);
        //  response.headers.set("Set-Cookie", `mytoken=; HttpOnly; Path=/; Max-Age=${0}`);
        Cookies.remove('auth_token')
        Cookies.remove('username')
        Cookies.remove('email')
        
        return response

    }catch(error){
        return new Response(JSON.stringify({error: "Failed to logout", error: error.message}), {status: 500})
    }

}