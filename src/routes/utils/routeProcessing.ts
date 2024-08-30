import { Prisma } from "@prisma/client";

export function errorHandler(e: any, msg: string) {
  if (e !== true) {
    console.error(e);
  }

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // https://www.prisma.io/docs/orm/reference/error-reference
    if (e.code === 'P2002') {
      msg = 'Camera with the same name already exists';
    }
  }

  return { msg };
}

export function removeQuotationMarks(str: string) {
  if (str.at(-1) === '"') {
    str = str.slice(0, -1); 
  }
  if (str.at(0) === '"') {
    str = str.slice(1, str.length - 1); 
  }
  return str;
}