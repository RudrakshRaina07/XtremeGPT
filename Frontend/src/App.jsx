import React from 'react'
import {MyContext} from "./components/MyContext"
import Sidebar from "./components/Sidebar"
import ChatWindow from "./components/ChatWindow"

const App = () => {
  const providerValues = {}

  return (
    <div className="bg-[#212121] flex">
      <MyContext.Provider value={providerValues}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>
  )
}

export default App
