'use client'
import {useState, useEffect} from 'react'
import {useSession } from 'next-auth/react'
import {useRouter} from 'next/navigation'

import Profile from '@components/Profile'



const ProfilePage = () => {
    const {data : session} = useSession()
    const [posts, setPosts] =useState([])

    useEffect(() => {
        const fetchPrompt = async (req, res) => {
          const response = await fetch(`/api/user/${session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data);
        };
        if(session?.user.id)fetchPrompt();
      }, []);

      const handleEdit = () => {

}

const handleDelete = async() => {

}
  return (
    <Profile
        name="My Account"
        desc="Welcome to your personalized profile page"
        data={[]}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default ProfilePage