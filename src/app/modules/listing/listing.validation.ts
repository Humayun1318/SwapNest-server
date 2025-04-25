import { z } from "zod";
import {
  ListingCategory,
  ListingCondition,
  ListingLocation,
  ListingStatus,
} from "./listing.interface";

// Zod Validation Schema
export const listingSchemaValidation = z
  .object({
    body: z.object({
      title: z.string().min(5, "Title must be at least 5 characters"),
      description: z.string().min(20, "Description must be at least 20 characters"),
      price: z.number().positive("Price must be a positive number"),
      condition: z.nativeEnum(ListingCondition),
      images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image is required"),
      status: z
        .nativeEnum(ListingStatus, {
          required_error: "Status is required",
          invalid_type_error: "Invalid status value provided",
        })
        .optional()
        .default(ListingStatus.AVAILABLE),

      category: z.nativeEnum(ListingCategory, {
        required_error: "Category is required",
        invalid_type_error: "Invalid category selected",
      }),
      // customCategory: z
      //   .string()
      //   .max(20, "Custom category must be less than 100 characters")
      //   .optional(),
      location: z.nativeEnum(ListingLocation, {
        required_error: "Location is required",
        invalid_type_error: "Invalid location selected",
      }),
      customLocation: z
        .string()
        .max(100, "Custom location must be less than 100 characters")
        .optional(),
      isDeleted: z.boolean().default(false).optional(),
    }),
  })
  // .refine(
  //   (data) => {
  //     // If category is "other", customCategory must be truthy (non-empty)
  //     return data.body.category !== "other" || !!data.body.customCategory;
  //   },
  //   {
  //     message: "Custom category is required when 'Other' is selected",
  //     path: ["body", "customCategory"],
  //   },
  // )
  .refine(
    (data) => {
      return data.body.location !== "Other" || !!data.body.customLocation;
    },
    {
      message: "Custom location is required when 'Other' is selected",
      path: ["body", "customLocation"],
    },
  );
export const updateListingSchemaValidation = z
  .object({
    body: z.object({
      title: z.string().min(5, "Title must be at least 5 characters").optional(),
      description: z.string().min(20, "Description must be at least 20 characters").optional(),
      price: z.number().positive("Price must be a positive number").optional(),
      condition: z.nativeEnum(ListingCondition).optional(),
      images: z
        .array(z.string().url("Invalid image URL"))
        .min(1, "At least one image is required")
        .optional(),
      status: z
        .nativeEnum(ListingStatus, {
          required_error: "Status is required",
          invalid_type_error: "Invalid status value provided",
        })
        .optional()
        .default(ListingStatus.AVAILABLE),
      category: z
        .nativeEnum(ListingCategory, {
          required_error: "Category is required",
          invalid_type_error: "Invalid category selected",
        })
        .optional(),
      customCategory: z
        .string()
        .max(20, "Custom category must be less than 100 characters")
        .optional(),
      location: z
        .nativeEnum(ListingLocation, {
          required_error: "Location is required",
          invalid_type_error: "Invalid location selected",
        })
        .optional(),
      customLocation: z
        .string()
        .max(100, "Custom location must be less than 100 characters")
        .optional(),
      isDeleted: z.boolean().default(false).optional(),
    }),
  })
  // .refine(
  //   (data) => {
  //     // If category is "other", customCategory must be truthy (non-empty)
  //     return !data.body.category || data.body.category !== "other" || !!data.body.customCategory;
  //   },
  //   {
  //     message: "Custom category is required when 'Other' is selected",
  //     path: ["body", "customCategory"],
  //   },
  // )
  .refine(
    (data) => {
      return !data.body.location || data.body.location !== "Other" || !!data.body.customLocation;
    },
    {
      message: "Custom location is required when 'Other' is selected",
      path: ["body", "customLocation"],
    },
  );

export const ListingValidations = {
  listingSchemaValidation,
  updateListingSchemaValidation,
};
