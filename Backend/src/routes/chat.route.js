import express from "express"
import {Thread} from "../models/Thread.js";
import {groqMain} from "../utils/groqai.js"
import mongoose from "mongoose";

const router = express.Router()

router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({updatedAt: -1})
        
        return res.json(threads)
    } catch (error) {
        console.error("Error fetching threads: ", error)
        return res.status(500).json({error: "Failed to fetch threads"})
    }
})

router.get("/thread/:threadId", async (req, res) => {
    const {threadId} = req.params
    try {
        const thread = await Thread.findOne({threadId})

        if(!thread){
            res.status(404).json({error: "Thread not found"})
        }

        return res.json(thread.messages)
    } catch (error) {
        console.error("Error fetching chat: ", error)
        return res.status(500).json({error: "Failed to fetch chat"})
    }
})

router.delete("/thread/:threadId", async (req, res) => {
    const {threadId} = req.params
    try {
        const deletedThread = await Thread.findOneAndDelete({threadId})

        if(!deletedThread){
            res.status(404).json({error: "Thread not found"})
        }

        return res.status(200).json({message: "Thread deleted successfully"})

    } catch (error) {
        console.error("Error deleting thread: ", error)
        return res.status(500).json({error: "Failed to delete thread"})
    }
})

router.post("/chat/:threadId", async (req, res) => {
    const {message} = req.body
    const {threadId} = req.params    

    if(!threadId || !message){
        return res.status(400).json({error: "Missing required details"})
    }

    try {
        let thread = await Thread.findOne({threadId})

        if(!thread){
            thread = new Thread({
                threadId,
                title: message,
                messages: [{role: "user", content: message}]
            })
        }else{
            thread.messages.push({role: "user", content: message})
        }

        const assistantReply = await groqMain(message)

        thread.messages.push({role: "assistant", content: assistantReply})
        thread.updatedAt = new Date()

        await thread.save()
        return res.status(200).json({reply: assistantReply})

    } catch (error) {
        console.error("Error in chat: ", error)
        return res.status(500).json({error: "Error in chat"})
    }
})

export default router