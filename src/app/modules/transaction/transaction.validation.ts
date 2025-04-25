/* eslint-disable prettier/prettier */
import { z } from "zod";

const createTransactionValidationSchema = z.object({
  body: z.object({
    buyerID: z.string().optional(),
    sellerID: z.string().optional(),
    itemID: z.string(),
  }),
});

export const TransactionValidationSchema = {
  createTransactionValidationSchema,
};
