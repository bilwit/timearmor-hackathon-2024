import express, { Router, Request, Response } from "express";
import { NewCamera, UpdatedCamera } from "../..";
import { Prisma, camera } from "@prisma/client";

const router: Router = express.Router();

router.get('/cameras', async (req: Request, res: Response) => {
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
    errorHandler(e, res, 'Could not fetch cameras');
  }
});

router.post('/cameras', async (req: Request, res: Response) => {
  try {
    const input = JSON.parse(req.body);
    const newData: NewCamera = {
      name: input?.name,
      model: input?.model,
      url_mjpeg: input?.url_mjpeg,
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
    errorHandler(e, res, 'Could not create camera');
  }
});

router.delete('/cameras/:id', async (req: Request, res: Response) => {
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
    errorHandler(e, res, 'Could not delete camera');
  }
});

router.patch('/cameras/:id', async (req: Request, res: Response) => {
  try {
    const input = JSON.parse(req.body);
    const updatedData: UpdatedCamera = {};

    if (input?.name) {
      updatedData.name = input?.name;
    }

    if (input?.model) {
      updatedData.model = input?.model;
    }

    if (input?.url_mjpeg) {
      updatedData.url_mjpeg = input?.url_mjpeg;
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
    errorHandler(e, res, 'Could not edit camera');
  }
});

function errorHandler(e: any, res: Response, msg: string) {
  if (e !== true) {
    console.error(e);
  }

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // https://www.prisma.io/docs/orm/reference/error-reference
    if (e.code === 'P2002') {
      msg = 'Camera with the same name already exists';
    }
  }

  return res.status(500).json({ msg });
}

export default router;
