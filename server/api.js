import { Router } from "express";
import bookingsRouter from "./bookings";
import eventsRouter from "./events";
import traineesRouter from "./trainees";
import RegistrationForm from "./registration";



const router = Router();

router.use(bookingsRouter);
router.use(eventsRouter);
router.use(traineesRouter);
router.use("/register", RegistrationForm);


export default router;
