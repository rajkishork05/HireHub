import "./config/instrument.js"
import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js"
import connectCloudinary from "./config/cloudinary.js";
import userRoutes from "./routes/userRoutes.js"
import jobRoutes from "./routes/jobRoutes.js"
import {clerkMiddleware} from "@clerk/express"
//initialize express
const app = express();


//middleware
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

//database
await connectDB()
await connectCloudinary()


//routes
app.get("/", (req, res)=>{
    res.send("<h1>hello raj</h1>")
})
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks)

app.use("/api/company", companyRoutes)

app.use("/api/jobs", jobRoutes)

app.use("/api/users", userRoutes)
//server
const port = process.env.PORT
Sentry.setupExpressErrorHandler(app);
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})

