import dotenv from "dotenv"
import {app} from "./app.js"
import {groqMain} from "./groq.js"

dotenv.config({
    path: "./.env"
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`);
})

app.post("/test", async(req, res) => {
    const message = req.body.message
    const response = await groqMain(message)
    const data = response.choices[0].message?.content
    console.log(data);
    

    return res.json(data)
})