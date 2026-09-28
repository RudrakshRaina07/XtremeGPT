import React, { useState } from 'react'
import {MyContext} from "./components/MyContext"
import Sidebar from "./components/Sidebar"
import ChatWindow from "./components/ChatWindow"
import {v1 as uuidv1} from "uuid"

const App = () => {
  const [prompt, setPrompt] = useState("")
  const [reply, setReply] = useState("")
  const [currentThreadId, setCurrentThreadId] = useState(uuidv1())
  const [prevChats, setPrevChats] = useState([])
  const [newChat, setNewChat] = useState(true)

  const providerValues = {
    prompt, setPrompt, reply, setReply, currentThreadId, prevChats, setPrevChats, newChat, setNewChat, setCurrentThreadId
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

export default App
