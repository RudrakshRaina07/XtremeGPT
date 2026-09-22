import mongoose, {Schema} from "mongoose"

const MessageSchema = new Schema({
    content:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["user", "assistant"],
        required: true,
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
})

const ThreadSchema = new Schema({
    threadId:{
        type: String,
        required: true,
        unique: true
    },
    title:{
        type: String,
        default: "New chat"
    },
    message: [MessageSchema],
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

export const Thread = mongoose.model("Thread", ThreadSchema)