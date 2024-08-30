import express, { Router, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import multer from 'multer';
import { errorHandler } from "./utils/routeProcessing";

const parser = multer();
const router: Router = express.Router();

// parser.none() middleware required to process multiform content body
// which for some reason add quotations to strings, requiring removeQuotationMarks();

router.get('/', parser.none(), async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      data: [],
    });
  } catch (e) {
    res.status(500).send(errorHandler(e, 'Could not fetch camera'));
  }
});

export default router;
