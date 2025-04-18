/* eslint-disable prettier/prettier */
import { model, Schema } from 'mongoose';
import { TTransaction } from './transaction.interface';

const transactionSchema = new Schema<TTransaction>(
  {
    buyerID: {
      type: Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    sellerID: {
      type: Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    itemID: {
      type: Schema.ObjectId,
      required: true,
      ref: 'Listing',
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'completed'],
        message: '{VALUE} is not a valid status',
      },
      default: 'pending',
    },
  
  },
  {
    timestamps: true,
    
  },
);

export const Transaction = model<TTransaction>(
  'Transaction',
  transactionSchema,
);