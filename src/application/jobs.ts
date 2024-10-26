import { Request, Response, NextFunction } from "express";
import Job from "../infrastructure/schemas/job";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { z } from "zod";
import { Console } from "console";

export const getAllJobs = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const jobs = await Job.find().populate("company").exec();
        return res.status(200).json(jobs);
    } catch (error) {
        next(error)
    }
    
}

export const createNewJob = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const objectIdSchema = z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
            message: "Invalid ObjectId format",
          });

        const job = z.object({ title: z.string(), company: objectIdSchema, description: z.string(), type: z.string(), location: z.string(), questions: z.string().array().optional() }).safeParse(req.body)

        if (!job.success) {
            throw new ValidationError(job.error.message)
        }
        await Job.create(job.data);

        return res.status(201).send();

    } catch (error) {
        next(error)
    }
    
}

export const getJobById = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const job = await Job.findById(req.params._id).populate("company").exec();;

        if(!job) {
            throw new NotFoundError("Job Not Found");
        }
        return res.status(200).json(job);
    } catch (error) {
        next(error)
    }

}

export const deleteJobById = async (req: Request, res: Response, next:NextFunction) => {
    try {    
        const job = await Job.findByIdAndDelete(req.params._id);

        if(!job) {
            throw new NotFoundError("Job Not Found");
        }
        return res.status(204).send();
        
    } catch (error) {
        next(error)
    }

}

export const UpdateJobById = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const jobToUpdate = await Job.findById(req.params._id);

        if(!jobToUpdate) {
            throw new NotFoundError("Job Not Found");
        }

        const job = z.object({ title: z.string(), description: z.string(), type: z.string(), location: z.string(), questions: z.string().array().optional() }).safeParse(req.body)
        if (!job.success) {
            throw new ValidationError(job.error.message)
        }

        await Job.findByIdAndUpdate(req.params._id, { title: req.body.title, description: req.body.description, location: req.body.location, type: req.body.type });
        return res.status(204).send();

    } catch (error) {
        next(error)
    }

}

export const getJobsByCompanyId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { companyId } = req.params; // Extract companyId from request params
  
      // Find all jobs where the company field matches the companyId
      const jobs = await Job.find({ company: companyId }).populate("company").exec();
  
      if (!jobs.length) {
        throw new NotFoundError("Job Not Found");
    }
  
      return res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  };
