"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import {useSession} from 'next-auth/react'
import Cookies from 'js-cookie'

const PromptCardList = ({ data, handleTagClicks }) => {
  return (
    <div className="mt-16 prompt_layout min-h-full">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClicks={handleTagClicks}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const {data : session} = useSession()
  const [item, setItem] = useState("")
  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(()=>{
    const cookieValue = Cookies.get('auth_token');
    setItem(cookieValue)
  },[])

  useEffect(() => {
    const fetchPrompt = async (req, res) => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPrompt();
  }, []);

  return (
    <section className="feed min-h-full">
    { session?.user || item && <><form className="relative w-full flex-center ">
        <input
          type="text"
          placeholder="Search a username or a tag"
          value={searchText}
          onChange={handleSearchText}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClicks={() => {}} />
      </> }
      
    </section>
  );
};

export default Feed;
