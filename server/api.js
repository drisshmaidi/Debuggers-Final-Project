import { Router } from "express";
import bookingsRouter from "./bookings";
import eventsRouter from "./events";
import traineesRouter from "./trainees";

const router = Router();

router.use(bookingsRouter);
router.use(eventsRouter);
router.use(traineesRouter);

export default router;
