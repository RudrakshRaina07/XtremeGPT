import dotenv from "dotenv"
import {app} from "./app.js"
import {groqMain} from "../utils/groqai.js"
import connectDB from "./db/index.js"

dotenv.config({
    path: "./.env"
})

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERROR: ", error);
        throw(error)
    })

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on PORT:  ${process.env.PORT}`);
        
    })
})
.catch((err) => {
    console.log("MONGODB connection failed!! ", err);
    
})

app.post("/test", async(req, res) => {
    const message = req.body.message
    const response = await groqMain(message)
    const data = response.choices[0].message?.content
    console.log(data);
    
    return res.json(data)
})