import { Router } from "express";

import logger from "./utils/logger";

const router = Router();

router.get("/bookings", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, bookings!" });
});

export default router;