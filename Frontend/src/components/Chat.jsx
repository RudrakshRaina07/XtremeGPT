import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import "highlight.js/styles/github-dark.css";
import rehypeRaw from "rehype-raw";

const Chat = () => {
  const { newChat, prevChats, reply, setPrevChats } = useContext(MyContext);

  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (!reply) {
      setLatestReply(null);
      return;
    }

    const content = reply.split(" ");
    let idx = 0;

    setLatestReply("");

    const interval = setInterval(() => {

          setLatestReply(content.slice(0, idx+1).join(" "));

          idx++;
      if (idx >= content.length) {
        clearInterval(interval);

        setPrevChats(prev => [
          ...prev,
          {
            role: "assistant",
            content: reply
          }
        ])

        setLatestReply("")
      }
    }, 40);

    return () => clearInterval(interval);
  }, [ reply]);


  const renderAssistantMessage = (content) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          p: ({ children }) => (
            <p className="mb-4 leading-7 wrap-break-word">
              {children}
            </p>
          ),

          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mt-5 mb-4">
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
            <li className="leading-7">
              {children}
            </li>
          ),

          pre: ({ children }) => (
            <pre className="bg-[#0d1117] rounded-xl p-4 my-5 overflow-x-auto max-w-full border border-white/10">
              {children}
            </pre>
          ),

          code: ({ children }) => (
            <code className="bg-white/10 rounded px-1 py-0.5 text-sm">
              {children}
            </code>
          ),

          table: ({ children }) => (
            <div className="w-full overflow-x-auto my-5">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),

          th: ({ children }) => (
            <th className="border border-white/10 px-4 py-2 text-left">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border border-white/10 px-4 py-2">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  const AssistantMessage = ({ content }) => {
    return (
      <div className="w-full flex justify-start">
        <div className="w-[75%] ml-[12.5%] min-w-0">
          {renderAssistantMessage(content)}
        </div>
      </div>
    );
  };


  return (
    <div className="w-full min-w-0">

      {newChat && (
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-2xl">
            Start a New Chat!
          </h1>
        </div>
      )}


      <div className="w-full flex flex-col gap-8">

        {prevChats?.map((chat, idx) => {

          if (chat.role === "user") {
            return (
              <div
                key={idx}
                className="w-full flex justify-end"
              >
                <div className="max-w-[65%] bg-[rgba(255,255,255,0.05)] rounded-xl px-4 py-3 break-words whitespace-pre-wrap">
                  {chat.content}
                </div>
              </div>
            );
          }


          if (chat.role === "assistant") {
            return (
              <AssistantMessage
                key={idx}
                content={chat.content}
              />
            );
          }

          return null;
        })}


        {latestReply && (
          <AssistantMessage content={latestReply} />
        )}

      </div>
    </div>
  );
};

export default Chat;