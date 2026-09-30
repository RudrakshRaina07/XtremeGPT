import React, { useContext, useEffect } from 'react'
import 'remixicon/fonts/remixicon.css'
import { MyContext } from './MyContext';
import axios from 'axios';

const Sidebar = () => {
  const {allThreads, setAllThreads, currentThreadId} = useContext(MyContext)

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

  return (
    <section className="h-screen w-1/5 bg-[#171717] text-white flex flex-col">
      <div className="flex flex-col p-4 justify-between gap-10 mb-4"> 
        <img  alt="gpt logo" />
        <button className="bg-[#000000] cursor-pointer hover:bg-[rgba(180,180,180,0.05)] active:scale-95 px-4 py-1 rounded-xl text-lg font-medium flex gap-3 items-center"><span className="text-white"><i className="ri-edit-box-line"></i></span>New Chat</button>
      </div>
        <div className="flex-1 p-4 overflow-auto hide-scrollbar">
          <ul className="flex flex-col gap-4">
            {
              allThreads.map((thread, idx) => {
                return <li className=" bg-[#000000] cursor-pointer hover:bg-[rgba(180,180,180,0.05)] active:scale-95 rounded-xl px-4 py-2">
                    {thread.title}
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
