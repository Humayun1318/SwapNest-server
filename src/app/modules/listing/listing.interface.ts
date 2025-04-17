/* eslint-disable no-unused-vars */
import { Document } from "mongoose";

export enum ListingCondition {
  EXCELLENT = "excellent",
  GOOD = "good",
  FAIR = "fair",
  POOR = "poor",
}

export enum ListingStatus {
  AVAILABLE = "available",
  SOLD = "sold",
}

// ==================== LISTING TYPES ====================
export interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  condition: ListingCondition;
  images: string[];
  userID: string; //Schema.Types.ObjectId;
  status?: ListingStatus;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TListingCreate = Omit<IListing, "createdAt" | "updatedAt" | "status" | "userID">;
export type TListingUpdate = Partial<Omit<IListing, "userID" | "createdAt" | "updatedAt">>;
