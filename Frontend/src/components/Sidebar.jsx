import React from 'react'
import 'remixicon/fonts/remixicon.css'

const Sidebar = () => {
  return (
    <section className="h-screen w-1/5 bg-[#171717] text-white flex flex-col">
      <div className="flex flex-col p-4 justify-between gap-10 mb-4"> 
        <img src="" alt="gpt logo" />
        <button className="bg-[#000000] cursor-pointer hover:bg-[rgba(180,180,180,0.05)] active:scale-95 px-4 py-1 rounded-xl text-lg font-medium flex gap-3 items-center"><span className="text-white"><i class="ri-edit-box-line"></i></span>New Chat</button>
      </div>
        <div className="flex-1 p-4">
          <ul className="flex flex-col gap-4">
            <li className=" bg-[#000000] cursor-pointer hover:bg-[rgba(180,180,180,0.05)] active:scale-95 rounded-xl px-4 py-2">history1</li>
            <li className=" bg-[#000000] cursor-pointer hover:bg-[rgba(180,180,180,0.05)] active:scale-95 rounded-xl px-4 py-2">history2</li>
            <li className=" bg-[#000000] cursor-pointer hover:bg-[rgba(180,180,180,0.05)] active:scale-95 rounded-xl px-4 py-2">history3</li>
          </ul>
        </div>
        <div className="border-t p-4 border-[rgba(255,255,255,0.5)] m-4">
          <p className="font-bold">Made By Rudraksh ❤️</p>
        </div>
    </section>
  )
}

export default Sidebar
