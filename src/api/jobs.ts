import express from "express";
import { UpdateJobById, createNewJob, deleteJobById, getAllJobs, getJobById } from "../application/jobs";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middleware/authorization-middleware";
import { getJobsByCompanyId } from "../application/jobs";

const jobsRouter = express.Router();

jobsRouter.route("/").get(getAllJobs).post(ClerkExpressRequireAuth({}), AuthorizationMiddleware, createNewJob);
jobsRouter.route("/:_id").get(ClerkExpressRequireAuth({}), getJobById).put(ClerkExpressRequireAuth({}), UpdateJobById).delete(ClerkExpressRequireAuth({}), deleteJobById);
jobsRouter.route("/company/:companyId").get(ClerkExpressRequireAuth({}), getJobsByCompanyId); // New route for fetching jobs by companyId

export default jobsRouter