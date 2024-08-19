import express, { Router, Request, Response } from "express";

interface NewCamera {
  name: string,
  model: string,
  serial: string,
  ip_address: string,
}

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        res.send('OK');
    } catch (e: any) {
        res.status(500).send(e.toString());
    }
});

export default router;