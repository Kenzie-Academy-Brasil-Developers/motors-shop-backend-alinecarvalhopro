import "express-async-errors";
import "reflect-metadata";
import express from "express";
import { handleAppErrorMiddleware } from "./middlewares/handleAppError.middleware";
import { userRouter } from "./routes/users.routes";
import { sessionRouter } from "./routes/session.routes";
import { announcementsRouter } from "./routes/announcements.routes";
import { commentsRouter } from "./routes/comments.routes";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'https://motors-shop-alinecarvalho.vercel.app'
  }));

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/announcements", announcementsRouter);
app.use("/comments", commentsRouter);

app.use(handleAppErrorMiddleware);

export default app;
