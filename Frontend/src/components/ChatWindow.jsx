import React, { useContext, useEffect, useState } from 'react'
import Chat from "./Chat"
import { MyContext } from './MyContext';
import axios from 'axios';
import {ThreeDots} from "react-loader-spinner"

const ChatWindow = () => {
  const {prompt, setPrompt, reply, setReply, currentThreadId, prevChats, setPrevChats} = useContext(MyContext)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const getReply = async () => {
    if (!prompt.trim()) return;

    const userMessage = prompt;

    setPrompt("");

    setPrevChats(prev => [
      ...prev,
      {
        role: "user",
        content: userMessage
      }
    ]);

    setLoading(true);

    try {

      const response = await axios.post(
        `http://localhost:3000/api/chat/${currentThreadId}`,
        {
          message: userMessage
        }
      );

      const data = response.data;

      setReply(data.reply);
      
    } catch (error) {
      console.error("Error getting reply: ", error)
    }
    setLoading(false)
  }

  useEffect(() => {    
    if(prompt && reply){
      setPrevChats(prevChats => {
        
        return [...prevChats, {
            role: "user",
            content: prompt,
          },
          {
            role: "assistant",
            content: reply
          }
        ]
      })
    }

    setPrompt("")
  }, [reply]) 

  const handleProfileVisibility = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="h-screen w-[70%] flex flex-col min-w-0 overflow-hidden">
      <div className="flex justify-between p-8 items-center">
        <h3 className="font-semibold text-lg">XtremeGPT<span className="text-2xl ml-1"><i className="ri-arrow-down-s-line"></i></span></h3>
        <span 
          className="bg-blue-500 rounded-full h-10 w-10 items-center flex justify-center cursor-pointer active:scale-95"
          onClick={handleProfileVisibility}
          ><i className="ri-user-fill"></i>
        </span>
      </div>
      {
        isOpen && 
          <div className="absolute right-55 top-25 bg-[#000000] px-4  py-2 rounded-2xl">
            <div className="hover:bg-[rgba(180,180,180,0.5)] rounded-xl px-3 py-1 items-center ">
              <button className="cursor-pointer active:scale-95">Logout</button>
            </div>
          </div>
      }
      <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden hide-scrollbar">
        <Chat ></Chat>
      </div>
      <div className="flex justify-center items-center">
        <ThreeDots color="#fff" visible={loading} width="50px" />
      </div>
      <div className=" flex items-center justify-center m-7">
        <div className=" bg-[rgba(255,255,255,0.05)] h-16 rounded-2xl w-[70%] flex items-center p-5 gap-8">
          <textarea 
            type="text"
            placeholder="Ask me anything"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value)
            }}
            
            onKeyDown={(e) => {
              if(e.key === 'Enter' && !e.shiftKey){
                e.preventDefault()
                getReply()
              }
            }}

            className="w-full h-full py-1 outline-none overflow-hidden text-sm font-semibold wrap-break-word whitespace-normal resize-none"
          />
          <span className="text-2xl cursor-pointer active:scale-95" onClick={getReply}><i className="ri-send-ins-line"></i></span>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
