import { Router } from "express";
import db from "./db";
import logger from "./utils/logger";

const router = Router();

router.get("/events", (req, res) => {
  db.query("SELECT * FROM events")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      logger.error(error);
      res.status(200).json(error);
    });
});

router.get("/events/:id", (req, res) => {
  const eventId = req.params.id;
  db
    .query("SELECT * FROM events WHERE id=$1", [eventId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      logger.error(error);
      res.status(200).json(error);
    });
});

export default router;
