import express from "express";
import { createCompany, getCompanyByID, getAllCompnanies } from "../application/company";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middleware/authorization-middleware";


const companyRouter = express.Router();

companyRouter.route("/").post(ClerkExpressRequireAuth({}), createCompany).get(getAllCompnanies);
companyRouter.route("/:id")
  .get(ClerkExpressRequireAuth({}),AuthorizationMiddleware, getCompanyByID);

export default companyRouter