import React, { useContext,  } from 'react'
import { AuthContext } from '../context/AuthContext';

const ChatMessage = ({ content, authorName}) => {
    let {user} = useContext(AuthContext)
    
    
     

  return (
        <div>
            {authorName===user.username ? (
                <li class="flex justify-end mb-4"> 
                <div class="bg-green-200 rounded p-4 chat-bubble">
                    <p class="break-words">
                        {content}
                    </p>
                </div> 
            </li> ) : (            
                <li>
                <div class="flex justify-start">
                    <div class="bg-gray-200 p-4 rounded chat-bubble">
                        <span>{content}</span>
                    </div>  
                </div>
                <div class="text-sm font-light py-1 ml-5">
                    <span class="text-black">{authorName}</span>
                </div>
            </li>) }

    </div>
  )
}

export default ChatMessage