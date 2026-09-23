import express from "express"
import { Thread } from "../models/Thread";
import {groqMain} from "../utils/groqai"

const router = express.Router()

router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({updatedAt: -1})
        
        res.json(threads)
    } catch (error) {
        console.error("Error fetching threads: ", error)
        res.status(500).json({error: "Failed to fetch threads"})
    }
})

router.get("/thread/:threadId", async (req, res) => {
    const {threadId} = req.params
    try {
        const thread = await Thread.findById(threadId)

        if(!thread){
            res.status(404).json({error: "Thread not found"})
        }

        res.json(thread.messages)
    } catch (error) {
        console.error("Error fetching chat: ", error)
        res.status(500).json({error: "Failed to fetch chat"})
    }
})

router.delete("/thread/:threadId", async (req, res) => {
    const {threadId} = req.params
    try {
        const deletedThread = await Thread.findOneAndDelete(threadId)

        if(!deletedThread){
            res.status(404).json({error: "Thread not found"})
        }

        res.status(200).json({message: "Thread deleted successfully"})

    } catch (error) {
        console.error("Error deleting thread: ", error)
        res.status(500).json({error: "Failed to delete thread"})
    }
})

router.post("/chat", async (req, res) => {
    const {threadId, message} = req.body

    if(!threadId || !message){
        res.status(400).json({error: "Missing required details"})
    }

    try {
        const thread = await Thread.findOne(threadId)

        if(!thread){
            new Thread({
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
        res.status(200).json({reply: assistantReply})

    } catch (error) {
        console.error("Error in chat: ", error)
        res.status(500).json({error: "Error in chat"})
    }
})

export default router