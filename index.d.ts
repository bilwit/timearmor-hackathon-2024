import { Prisma } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      db: Prisma
    }
  }
}

export interface NewCamera {
  name: string,
  model: string,
  url_mjpeg: string,
}

export interface UpdatedCamera {
  name?: string,
  model?: string,
  url_mjpeg?: string,
}

export interface Camera {
  id: number,
  created_at: Date,
  updated_at: Date,
  name: string,
  model: string,
  url_mjpeg: string,
}

export interface ResponseDataCamera {
  data?: Camera[],
  msg?: string,
}
