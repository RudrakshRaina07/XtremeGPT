import React from 'react'
import Chat from "./Chat"

const ChatWindow = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <div className="flex justify-between p-8 items-center">
        <h3 className="font-semibold text-lg">XtremeGPT<span className="text-2xl ml-1"><i className="ri-arrow-down-s-line"></i></span></h3>
        <span className="bg-blue-500 rounded-full h-10 w-10 items-center flex justify-center cursor-pointer"><i className="ri-user-fill"></i></span>
      </div>
      <Chat></Chat>
      <div className=" flex items-center justify-center m-7">
        <div className=" bg-[rgba(255,255,255,0.05)] h-16 rounded-2xl w-[70%] flex items-center p-5 gap-8">
          <textarea 
            type="text"
            placeholder="Ask me anything"
            className="w-full h-full py-1 outline-none overflow-hidden text-sm font-semibold wrap-break-word whitespace-normal resize-none"
          />
          <span className="text-2xl cursor-pointer active:scale-95"><i className="ri-send-ins-line"></i></span>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
