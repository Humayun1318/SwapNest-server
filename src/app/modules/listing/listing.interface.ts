/* eslint-disable no-unused-vars */
import { Types } from "mongoose";
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

export enum ListingCategory {
  ELECTRONICS = "electronics",
  FURNITURE = "furniture",
  CLOTHING = "clothing",
  BOOKS = "books",
  OTHER = "other",
}

export enum ListingLocation {
  DHAKA = "dhaka",
  CHITTAGONG = "chittagong",
  SYLHET = "sylhet",
  RAJSHAHI = "rajshahi",
  KHULNA = "khulna",
  OTHER = "other",
}

// ==================== LISTING TYPES ====================
export interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  condition: ListingCondition;
  images: string[];
  userID: Types.ObjectId;
  status?: ListingStatus;
  isDeleted?: boolean;
  category: ListingCategory;
  customCategory?: string;
  location: ListingLocation;
  customLocation?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TListingCreate = Omit<IListing, "createdAt" | "updatedAt" | "status" | "userID">;
export type TListingUpdate = Partial<
  Omit<IListing, "userID" | "createdAt" | "updatedAt" | "isDeleted">
>;
