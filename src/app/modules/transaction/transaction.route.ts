/* eslint-disable prettier/prettier */
import express from 'express';
import { TransactionControllers } from './transaction.controller';
import  auth  from '../../middlewares/auth';
import  validateRequest  from '../../middlewares/validateRequest';
import { TransactionValidationSchema } from './transaction.validation';

const router = express.Router();

router.post(
  '/transactions',
  auth("admin", "user"),
  validateRequest(
    TransactionValidationSchema.createTransactionValidationSchema,
  ),
  TransactionControllers.createTransactionController,
);

router.patch(
  '/transactions/:id',
  auth("admin", "user"),
  TransactionControllers.updateTransactionStatusByIdController,
);

router.get(
  '/purchases/:userId',
  auth("admin", "user"),
  TransactionControllers.getPurchasesHistoryBySpecificUserController,
);

router.get(
  '/sales/:userId',
  auth("admin", "user"),
  TransactionControllers.getSalesHistoryBySpecificUserController,
);

export const TransactionRoutes = router;