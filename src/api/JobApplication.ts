import express from "express";
import { createJobApplication, getJobApplication, getJobApplicationById, getJobApplicationsByCompanyId } from "../application/JobApplication";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middleware/authorization-middleware";


const jobApplicationRouter = express.Router();

jobApplicationRouter.route("/").post(ClerkExpressRequireAuth({}), createJobApplication).get(getJobApplication);
jobApplicationRouter.route("/:id").get(ClerkExpressRequireAuth({}),AuthorizationMiddleware, getJobApplicationById);
jobApplicationRouter.route("/company/:companyId").get(ClerkExpressRequireAuth({}), getJobApplicationsByCompanyId); // New route for fetching jobs by companyId


export default jobApplicationRouter