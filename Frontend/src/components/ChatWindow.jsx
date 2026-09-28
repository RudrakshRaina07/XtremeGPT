import React, { useContext, useEffect, useState } from 'react'
import Chat from "./Chat"
import { MyContext } from './MyContext';
import axios from 'axios';
import {ThreeDots} from "react-loader-spinner"

const ChatWindow = () => {
  const {prompt, setPrompt, reply, setReply, currentThreadId, prevChats, setPrevChats} = useContext(MyContext)
  const [loading, setLoading] = useState(false)

  const getReply = async () => {
    setLoading(true)
    try {      
      const response = await axios.post(`http://localhost:3000/api/chat/${currentThreadId}`, 
        {
          message: prompt
        }
      )
      
      const data = response.data
      
      setReply(data.reply)
      
      
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

  return (
    <div className="h-screen w-[70%] flex flex-col min-w-0 overflow-hidden">
      <div className="flex justify-between p-8 items-center">
        <h3 className="font-semibold text-lg">XtremeGPT<span className="text-2xl ml-1"><i className="ri-arrow-down-s-line"></i></span></h3>
        <span className="bg-blue-500 rounded-full h-10 w-10 items-center flex justify-center cursor-pointer"><i className="ri-user-fill"></i></span>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto hide-scrollbar">
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
            className="w-full h-full py-1 outline-none overflow-hidden text-sm font-semibold wrap-break-word whitespace-normal resize-none"
          />
          <span className="text-2xl cursor-pointer active:scale-95" onClick={getReply}><i className="ri-send-ins-line"></i></span>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
