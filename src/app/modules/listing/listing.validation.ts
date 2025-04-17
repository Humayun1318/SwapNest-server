import { z } from "zod";
import { ListingCondition, ListingStatus } from "./listing.interface";

// Zod Validation Schema
export const ListingSchemaValidation = z.object({
  body: z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    price: z.number().positive("Price must be a positive number"),
    condition: z.nativeEnum(ListingCondition),
    images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image is required"),
  }),
});
