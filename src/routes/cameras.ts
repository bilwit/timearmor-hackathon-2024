import express, { Router, Request, Response } from "express";
import { NewCamera, UpdatedCamera } from "../..";
import { camera } from "@prisma/client";
import multer from 'multer';
import { errorHandler, removeQuotationMarks } from "./utils/routeMiddleware";

const parser = multer();
const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const cameras = await req.db.camera.findMany({});

    if (cameras) {
      return res.status(200).json({
        data: cameras,
      });
    } else {
      throw true;
    }
  } catch (e) {
    res.status(500).json(errorHandler(e, 'Could not fetch camera'));
  }
});

router.post('/', parser.none(), async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const newData: NewCamera = {
      name: removeQuotationMarks(req.body?.name),
      model: removeQuotationMarks(req.body?.model),
      url_mjpeg: removeQuotationMarks(req.body?.url_mjpeg),
    }
    const newCamera = await req.db.camera.create({
      data: newData,
    });
 
    if (newCamera?.id) {
      return res.status(200).json({
        data: [newCamera],
      });
    } else {
      throw true;
    }
  } catch (e: any) {
    res.status(500).json(errorHandler(e, 'Could not create camera'));
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const camera: camera = await req.db.camera.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    if (camera) {
      return res.status(200).json({
        data: [{ id: camera.id }],
      });
    } else {
      throw true;
    }
  } catch (e: any) {
    res.status(500).json(errorHandler(e, 'Could not delete camera'));
  }
});

router.patch('/:id', parser.none(), async (req: Request, res: Response) => {
  try {
    const updatedData: UpdatedCamera = {};

    if (req?.body?.name) {
      updatedData.name = removeQuotationMarks(req.body?.name);
    }

    if (req?.body?.model) {
      updatedData.model = removeQuotationMarks(req.body?.model);
    }

    if (req?.body?.url_mjpeg) {
      updatedData.url_mjpeg = removeQuotationMarks(req.body?.url_mjpeg);
    }
    
    const updatedCamera = await req.db.camera.update({
      where: {
        id: Number(req.params.id),
      },
      data: updatedData,
    });

    if (updatedCamera?.id) {
      return res.status(200).json({
        data: [updatedCamera],
      });
    } else {
      throw true;
    }
  } catch (e: any) {
    res.status(500).json(errorHandler(e, 'Could not edit camera'));
  }
});

export default router;
