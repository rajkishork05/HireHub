import express from "express"
import { getJobById, getJobs } from "../controllers/jobController.js";

const router = express.Router()

// get all job data
router.get("/", getJobs)

//get a single job by id
router.get("/:id", getJobById)



export default router;