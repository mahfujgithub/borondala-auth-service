import { NextFunction, Request, RequestHandler, Response } from 'express'
import { CustomerService } from './customer.service'
import catchAsync from '../../../../shared/catchAsync'

const createCustomer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, ...customer } = req.body;

    const result = await CustomerService.createCustomer(user, customer);

    next();

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  },
)

export const CustomerController = {
  createCustomer,
}
