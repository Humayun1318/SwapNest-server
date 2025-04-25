import { z } from "zod";

const addWishlistSchema = z.object({
  body: z.object({
    listing: z.string({
      required_error: "Listing ID is required",
    }),
  }),
});

export const WishlistValidation = {
  addWishlistSchema,
};
