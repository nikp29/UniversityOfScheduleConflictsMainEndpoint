import express from "express";
import { checkIfAuthenticated } from "./firebase/authentication.js";
import {
    getSchedule,
    getSchedules,
    updateSchedule,
} from "./controller/schedule.js";
import { createAccount } from "./controller/account.js";

var router = express.Router();

router.post("/getschedule", getSchedule);
router.post("/schedules", getSchedules);
router.put("/schedule", checkIfAuthenticated, updateSchedule);
router.post("/account", checkIfAuthenticated, createAccount);

export default router;
