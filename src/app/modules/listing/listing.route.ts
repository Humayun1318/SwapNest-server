import express from "express";
import { ListingController } from "./listing.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ListingSchemaValidation } from "./listing.validation";

const router = express.Router();

router.post("/listings", validateRequest(ListingSchemaValidation), ListingController.createListing);
router.get("/listings", ListingController.getAllAvailableListings);

export const ListingRoutes = router;
