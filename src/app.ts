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
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
// application routes
// app.use('/api/v1', router);
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hi Team Runtime Nation !");
});

app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
