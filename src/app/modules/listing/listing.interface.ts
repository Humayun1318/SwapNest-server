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
  Electronics = "electronics",
  Mobile = "mobile",
  Computers = "computers",
  Appliances = "appliances",
  Furniture = "furniture",
  Clothing = "clothing",
  Footwear = "footwear",
  Accessories = "accessories",
  Vehicles = "vehicles",
  Books = "books",
  Sports = "sports",
  Toys = "toys",
  Health = "health",
  Beauty = "beauty",
  Jewelry = "jewelry",
  Tools = "tools",
  Gardening = "gardening",
  MusicalInstruments = "musicalinstruments",
  OfficeSupplies = "officesupplies",
  PetSupplies = "petsupplies",
  BabyProducts = "babyproducts",
  ArtCollectibles = "artcollectibles",
  Gaming = "gaming",
  Cameras = "cameras",
  RealEstate = "realestate",
  Other = "other",
}

export enum ListingLocation {
  DHAKA = "Dhaka",
  CHATTOGRAM = "Chattogram",
  RAJSHAHI = "Rajshahi",
  KHULNA = "Khulna",
  BARISAL = "Barisal",
  SYLHET = "Sylhet",
  RANGPUR = "Rangpur",
  MYMENSINGH = "Mymensingh",
  OTHER = "Other",
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
  location: ListingLocation;
  customLocation?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TListingCreate = Omit<
  IListing,
  "createdAt" | "updatedAt" | "status" | "userID" | "isDeleted"
>;
export type TListingUpdate = Partial<
  Omit<IListing, "userID" | "createdAt" | "updatedAt" | "isDeleted">
>;
