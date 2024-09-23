import express from 'express'
const router = express.Router()
import { CustomerController } from './customer.controller'

router.post('/create-customer', CustomerController.createCustomer)

export const CustomerRoutes = router
