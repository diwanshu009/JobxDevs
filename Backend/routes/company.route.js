import express from 'express'
import { getCompany, getCompanybyId, registerCompany, updateCompany } from '../controllers/company.controller.js'
import { isAuthenticated }  from '../middlewares/isAuthenticated.js'
import { singleUpload } from '../middlewares/multer.js'
const router = express.Router()

router.route('/register').post(isAuthenticated,registerCompany)
router.route('/get').get(isAuthenticated,getCompany)
router.route('/get/:id').get(isAuthenticated,getCompanybyId)
router.route('/update/:id').put(isAuthenticated,singleUpload,updateCompany)

export default router