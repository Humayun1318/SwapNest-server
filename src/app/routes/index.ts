import { Router } from "express";
import { ListingRoutes } from "../modules/listing/listing.route";

const router = Router();

const moduleRoutes = [
  {
    path: "",
    route: ListingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
