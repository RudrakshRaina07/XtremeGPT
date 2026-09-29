import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './MyContext';
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github-dark.css"

const Chat = () => {
  const {newChat, prevChats, reply} = useContext(MyContext)
  const [latestReply, setLatestReply] = useState(null)

  useEffect(() => {
    if(!prevChats.length) return;

    const content = reply.split(" ")

    let idx = 0
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx+1).join(" "))

      idx++
      if(idx >= content.length) clearInterval(interval)
    }, 40);
  
    return () => clearInterval(interval)
  }, [prevChats, reply])

  return (
    <div className="w-full min-w-0 overflow-hidden">
      <div className="flex justify-center items-center mb-4">
        {newChat && <h1 className="text-2xl text-shadow-3xl">Start a New Chat!</h1>}
      </div>
      <div className="flex justify-center flex-col items-center gap-10 w-full min-w-0">
        {prevChats?.slice(0, -1).map((chat, idx) => {
              if(chat.role === "user"){
                return <div className="flex justify-end w-[65%]">
                  <p className="bg-[rgba(255,255,255,0.05)] rounded-xl py-2 px-4 wrap-break-word max-w-full">{chat.content}</p>
                </div>
              }
              if(chat.role === "assistant"){
                return <div className="flex justify-start w-[75%] min-w-0">
                    <div className="w-full min-w-0 text-[15px]">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight, rehypeRaw]}
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-2xl font-bold mt-6 mb-4">
                              {children}
                            </h1>
                          ),

                          h2: ({ children }) => (
                            <h2 className="text-xl font-bold mt-5 mb-3">
                              {children}
                            </h2>
                          ),

                          h3: ({ children }) => (
                            <h3 className="text-lg font-semibold mt-4 mb-2">
                              {children}
                            </h3>
                          ),

                          p: ({ children }) => (
                            <p className="leading-7 mb-4 text-gray-200">
                              {children}
                            </p>
                          ),

                          strong: ({ children }) => (
                            <strong className="font-bold text-white">
                              {children}
                            </strong>
                          ),

                          ul: ({ children }) => (
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                              {children}
                            </ul>
                          ),

                          ol: ({ children }) => (
                            <ol className="list-decimal pl-6 mb-4 space-y-2">
                              {children}
                            </ol>
                          ),

                          li: ({ children }) => (
                            <li className="leading-7 text-gray-200">
                              {children}
                            </li>
                          ),

                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-gray-500 pl-4 my-4 italic text-gray-400">
                              {children}
                            </blockquote>
                          ),

                          code: ({ children, className }) => {
                            const isCodeBlock = className?.includes("language-");

                            if (isCodeBlock) {
                              return (
                                <code className={className}>
                                  {children}
                                </code>
                              );
                            }

                            return (
                              <code className="bg-[#2f2f2f] text-gray-200 px-1.5 py-0.5 rounded-md text-sm">
                                {children}
                              </code>
                            );
                          },

                          pre: ({ children }) => (
                            <pre className="bg-[#0d1117] rounded-xl p-4 my-5 overflow-x-auto border border-white/10">
                              {children}
                            </pre>
                          ),

                          table: ({ children }) => (
                            <div className="overflow-x-auto my-5">
                              <table className="w-full border-collapse text-sm">
                                {children}
                              </table>
                            </div>
                          ),

                          th: ({ children }) => (
                            <th className="border border-white/10 bg-white/5 px-4 py-3 text-left font-semibold">
                              {children}
                            </th>
                          ),

                          td: ({ children }) => (
                            <td className="border border-white/10 px-4 py-3">
                              {children}
                            </td>
                          ),

                          hr: () => (
                            <hr className="border-white/10 my-6" />
                          ),

                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {chat.content}
                      </ReactMarkdown>
                    </div>
                </div>
              }
        })}

        {
          prevChats.length > 0 && latestReply !== null &&
          <div>
            <div className="flex justify-start w-[75%] min-w-0">
                    <div className="w-full min-w-0 text-[15px]">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight, rehypeRaw]}
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-2xl font-bold mt-6 mb-4">
                              {children}
                            </h1>
                          ),

                          h2: ({ children }) => (
                            <h2 className="text-xl font-bold mt-5 mb-3">
                              {children}
                            </h2>
                          ),

                          h3: ({ children }) => (
                            <h3 className="text-lg font-semibold mt-4 mb-2">
                              {children}
                            </h3>
                          ),

                          p: ({ children }) => (
                            <p className="leading-7 mb-4 text-gray-200">
                              {children}
                            </p>
                          ),

                          strong: ({ children }) => (
                            <strong className="font-bold text-white">
                              {children}
                            </strong>
                          ),

                          ul: ({ children }) => (
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                              {children}
                            </ul>
                          ),

                          ol: ({ children }) => (
                            <ol className="list-decimal pl-6 mb-4 space-y-2">
                              {children}
                            </ol>
                          ),

                          li: ({ children }) => (
                            <li className="leading-7 text-gray-200">
                              {children}
                            </li>
                          ),

                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-gray-500 pl-4 my-4 italic text-gray-400">
                              {children}
                            </blockquote>
                          ),

                          code: ({ children, className }) => {
                            const isCodeBlock = className?.includes("language-");

                            if (isCodeBlock) {
                              return (
                                <code className={className}>
                                  {children}
                                </code>
                              );
                            }

                            return (
                              <code className="bg-[#2f2f2f] text-gray-200 px-1.5 py-0.5 rounded-md text-sm">
                                {children}
                              </code>
                            );
                          },

                          pre: ({ children }) => (
                            <pre className="bg-[#0d1117] rounded-xl p-4 my-5 overflow-x-auto border border-white/10">
                              {children}
                            </pre>
                          ),

                          table: ({ children }) => (
                            <div className="overflow-x-auto my-5">
                              <table className="w-full border-collapse text-sm">
                                {children}
                              </table>
                            </div>
                          ),

                          th: ({ children }) => (
                            <th className="border border-white/10 bg-white/5 px-4 py-3 text-left font-semibold">
                              {children}
                            </th>
                          ),

                          td: ({ children }) => (
                            <td className="border border-white/10 px-4 py-3">
                              {children}
                            </td>
                          ),

                          hr: () => (
                            <hr className="border-white/10 my-6" />
                          ),

                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {latestReply}
                      </ReactMarkdown>
                    </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Chat
