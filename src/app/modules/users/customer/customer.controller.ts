import { RequestHandler } from 'express'
import { CustomerService } from './customer.service'

const createCustomer: RequestHandler = async (req, res, next) => {
  try {
    const {user, ...customer } = req.body
    const result = await CustomerService.createCustomer(user, customer)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const CustomerController = {
  createCustomer,
}
