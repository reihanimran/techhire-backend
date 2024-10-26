import { Request, Response, NextFunction } from "express";
import Company from "../infrastructure/schemas/company";
import NotFoundError from "../domain/errors/not-found-error";
import Job from "../infrastructure/schemas/job";

export const createCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const company = req.body;
        console.log(company);
        const createdcompany = await Company.create(company);

        return res.status(201).send();
    } catch (error) {
        next(error)
    }
};

export const getCompanyByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id);
        if (company === null) {
            throw new NotFoundError("Invalid Job Application");
        }
        return res.status(200).json(company);
    } catch (error) {
        next(error)
    }
};

export const getAllCompnanies = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const companies = await Company.find();
        return res.status(200).json(companies);
    } catch (error) {
        next(error)
    }
    
}
