import express from 'express'
import { adminCreatedJobs, createJob, getAllJobs, getJobById } from '../controllers/job.controller.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
const router = express.Router()

router.route('/post').post(isAuthenticated,createJob)
router.route('/getjob').get(isAuthenticated,getAllJobs)
router.route('/getjob/:id').get(isAuthenticated,getJobById)
router.route('/adminJobs').get(isAuthenticated,adminCreatedJobs)

export default router