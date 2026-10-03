import React, { useContext, useEffect } from 'react'
import 'remixicon/fonts/remixicon.css'
import { MyContext } from './MyContext';
import axios from 'axios';
import {v1 as uuidv1} from "uuid"

const Sidebar = () => {
  const {allThreads, setAllThreads, currentThreadId, setCurrentThreadId, newChat, setNewChat, prevChats, setPrevChats, setReply, setPrompt} = useContext(MyContext)

  const getAllThreads = async () => {
    try {      
      const response = await axios.get(`http://localhost:3000/api/thread`)

      const data = response.data
      
      setAllThreads(data)
      
    } catch (error) {
      console.log(error); 
    }
  }

  useEffect(() => {
    getAllThreads()
  }, [currentThreadId])

  const createNewChat = () => {
    setNewChat(true)
    setPrompt("")
    setReply("")
    setCurrentThreadId(uuidv1())
    setPrevChats([])
  }

  const createNewThread = async (newThreadId) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/thread/${newThreadId}`)
        const data = response.data
        
        console.log(data);
        
        setPrevChats(data)
        setNewChat(false)
      } catch (error) {
        console.error("Error fetching chat: ", error)
      }
  }

  const deleteThread = async (threadId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/thread/${threadId}`)

      setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId))

      if(threadId === currentThreadId){
        createNewChat()
      }

    } catch (error) {
      console.error("Error in deleting thread: ", error)
    }
  }

  return (
    <section className="h-screen w-1/5 bg-[#171717] text-white flex flex-col">
      <div className="flex flex-col p-4 justify-between gap-10 mb-4"> 
        <img  alt="gpt logo" />
        <button onClick={createNewChat} className="bg-[#000000] cursor-pointer hover:bg-[rgba(180,180,180,0.05)] active:scale-95 px-4 py-1 rounded-xl text-lg font-medium flex gap-3 items-center"><span className="text-white"><i className="ri-edit-box-line"></i></span>New Chat</button>
      </div>
        <div className="flex-1 p-4 overflow-auto hide-scrollbar">
          <ul className="flex flex-col gap-4">
            {
              allThreads.map((thread, idx) => {
                return <li 
                  onClick={(e) => createNewThread(thread.threadId)}
                  className=" bg-[#000000] cursor-pointer hover:bg-[rgba(180,180,180,0.05)] active:scale-95  rounded-xl px-4 py-2 flex justify-between">
                    {thread.title}
                      <i 
                        className="ri-delete-bin-fill text-white hover:text-red-500! hover:text-xl transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteThread(thread.threadId)
                        }}
                      ></i>
                </li >
              })
            }
          </ul>
        </div>
        <div className="border-t p-4 border-[rgba(255,255,255,0.5)] m-4">
          <p className="font-bold">Made By Rudraksh ❤️</p>
        </div>
    </section>
  )
}

export default Sidebar
