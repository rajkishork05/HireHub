import "./config/instrument.js"
import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from "./controllers/webhooks.js";

//initialize express
const app = express();


//middleware
dotenv.config()
app.use(express.json())
app.use(cors())

//database
await connectDB()


//routes
app.get("/", (req, res)=>{
    res.send("<h1>hello raj</h1>")
})
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks)


//server
const port = process.env.PORT
Sentry.setupExpressErrorHandler(app);
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})

