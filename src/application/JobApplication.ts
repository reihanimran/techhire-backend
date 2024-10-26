import { Request, Response, NextFunction } from "express";
import JobApplication from "../infrastructure/schemas/JobApplication";
import NotFoundError from "../domain/errors/not-found-error";
import { generateratings } from "./rating";


export const createJobApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobApplication = req.body;
        console.log(jobApplication);
        const createdJobApplication = await JobApplication.create(jobApplication);

        generateratings(createdJobApplication._id)

        return res.status(201).send();
    } catch (error) {
        next(error)
    }
    
};

export const getJobApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {jobId} = req.query;
        if (jobId) {
            const jobApplication = await JobApplication.find({job:jobId});
            return res.status(200).json(jobApplication);
        }
        const jobApplication = await JobApplication.find().populate("job").exec();
        return res.status(200).json(jobApplication);

    } catch (error) {
        next(error)
    }
    
};

export const getJobApplicationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const { id } = req.params;
        const jobApplication = await JobApplication.findById(id).populate("job");
        if (jobApplication === null) {
            throw new NotFoundError("Invalid Job Application");
        }
        return res.status(200).json(jobApplication);
    } catch (error) {
        next(error)
    }
    
  }

  export const getJobApplicationsByCompanyId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { companyId } = req.params; // Extract companyId from request params
  
      // Find all jobs where the company field matches the companyId
      const jobApplications = await JobApplication.find({ company: companyId }).populate("company").exec();
  
      if (!jobApplications.length) {
        throw new NotFoundError("Job Not Found");
    }
  
      return res.status(200).json(jobApplications);
    } catch (error) {
      next(error);
    }
  };