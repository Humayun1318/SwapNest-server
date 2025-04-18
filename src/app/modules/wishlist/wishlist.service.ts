import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TWishlist } from "./wishlist.interface";
import { Wishlist } from "./wishlist.model";
import { Listing } from "../listing/listing.model";
import { TUser } from "../user/user.interface";

const addToWishlist = async (wishlistData: Partial<TWishlist>, authUser: TUser) => {
  try {
    if (!wishlistData.products || wishlistData.products.length === 0) {
      throw new AppError(StatusCodes.NOT_FOUND, "No products provided to add to wishlist.");
    }

    if (!authUser.id) {
      throw new AppError(StatusCodes.NOT_FOUND, "Login first than added your wishlist");
    }

    const userWishlist = await Wishlist.findOne({ user: authUser.id });

    for (const productItem of wishlistData.products) {
      const product = await Listing.findById(productItem.product);

      if (!product) {
        throw new AppError(StatusCodes.NOT_FOUND, `Product not found: ${productItem.product}`);
      }

      if (product.status === "sold") {
        throw new Error(`Product ${product?.title} is sold out.`);
      }

      // Check if product already exists in wishlist
      const isExists = userWishlist?.products.some(
        (p) => p.product.toString() === productItem.product.toString(),
      );

      if (isExists) {
        throw new AppError(
          StatusCodes.NOT_ACCEPTABLE,
          "You already added this product to your wishlist!",
        );
      }
    }

    if (userWishlist) {
      // Update existing wishlist and push new products
      userWishlist.products.push(...wishlistData.products);
      await userWishlist.save();
      return userWishlist;
    } else {
      // Create a new wishlist if it doesn't exist
      const createWishlist = new Wishlist({
        user: authUser.id,
        products: wishlistData.products,
      });
      const result = await createWishlist.save();
      return result;
    }
  } catch (error: any) {
    throw new AppError(StatusCodes.NOT_FOUND, error.message);
  }
};

const getWishlist = async (authUser: TUser) => {
  const result = await Wishlist.find({ user: authUser.id }).populate({
    path: "products.product",
    model: "Listing",
  });

  return result;
};

const deleteWishlist = async (id: string, authUser: TUser) => {
  try {
    const wishlist = await Wishlist.findOne({ user: authUser.id });

    if (!wishlist) {
      throw new Error("Wishlist not found.");
    }
    // Find the index of the product in the products array
    const productIndex = wishlist.products.findIndex(
      (item) => item.product.toString() === id.toString(),
    );

    if (productIndex === -1) {
      throw new Error("Product not found in your wishlist.");
    }

    // Remove the product from the wishlist
    wishlist.products.splice(productIndex, 1);

    // Save the updated wishlist
    const updatedWishlist = await wishlist.save();

    return updatedWishlist;
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete wishlist");
  }
};

export const WishlistServices = {
  getWishlist,
  addToWishlist,
  deleteWishlist,
};
