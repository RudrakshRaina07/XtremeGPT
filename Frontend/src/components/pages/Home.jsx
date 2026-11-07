import React, { useState } from 'react'
import {MyContext} from "../MyContext"
import Sidebar from "../Sidebar"
import ChatWindow from "../ChatWindow"
import {v1 as uuidv1} from "uuid"

const Home = () => {
  const [prompt, setPrompt] = useState("")
  const [reply, setReply] = useState("")
  const [currentThreadId, setCurrentThreadId] = useState(uuidv1())
  const [prevChats, setPrevChats] = useState([])
  const [newChat, setNewChat] = useState(true)
  const [allThreads, setAllThreads] = useState([])

  const providerValues = {
    prompt, setPrompt, reply, setReply, currentThreadId, prevChats, setPrevChats, newChat, setNewChat, setCurrentThreadId, allThreads, setAllThreads
  }

  return (
    <div className="bg-[#212121] flex h-screen">
      <MyContext.Provider value={providerValues}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>
  )
}

export default Home
