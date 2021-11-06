import express from "express";
import { checkIfAuthenticated } from "./firebase/authentication";

var router = express.Router();

router.get("/schedule", getSchedule);
router.get("/schedules", getSchedules);
router.post("/schedule", checkIfAuthenticated, updateSchedule);
router.post("/account", checkIfAuthenticated, createAccount);

export default router;
