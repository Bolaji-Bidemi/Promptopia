'use client'

import {useState} from 'react'
import {useSession} from 'next-auth/react'
import Image from 'next/image'
import Cookies from 'js-cookie'


const PromptCard = ({post, handleTagClicks, handleEdit, handleDelete}) => {
  const {data : session} = useSession()
  const [copied, setCopied] = useState('')
  

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(()=> setCopied(""), 6000)
  }


  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-wrap flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
          src={session?.user ? post.creator.image : '/assets/images/logo.svg'}
          alt="user-image"
          width={40}
          height={40}
          className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="text-gray-900 font-satoshi font-semibold">{session?.user ? post.creator.username : `${Cookies.get('username')}`}</h3>
            <p className="text-gray-500 text-sm font-inter">{session?.user ? post.creator.email: `${Cookies.get('email')}`}</p>
          </div>

        </div>

        <div className="copy_btn" onClick={handleCopy}>
            <Image 
              src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
              width={13}
              height={13}
              alt="copy"
            />
        </div>
      </div>
     <p className="my-4 text-sm text-gray-700 font-satoshi">{post.prompt}</p> 
     <p className="font-inter text-sm cursor-pointer blue_gradient" 
     onClick={()=> handleTagClicks && handleTagClicks(post.tag)
     }>{post.tag}</p>
    </div>
  )
}

export default PromptCard