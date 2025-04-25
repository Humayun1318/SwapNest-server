import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://swap-nest-client.vercel.app",
    ],
    credentials: true,
  }),
);
// application routes
// app.use('/api/v1', router);
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to SwapNest Server!");
});

app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
