import { Router } from "express";
import { ListingRoutes } from "../modules/listing/listing.route";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { TransactionRoutes } from "../modules/transaction/transaction.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/listings",
    route: ListingRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/",
    route: TransactionRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
