const express = require('express')
const { addEmployee } = require('../controllers/employeeController.js')

const router = express.Router()

router.post('/add', addEmployee)

module.exports = router 