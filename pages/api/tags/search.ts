import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { q },
  } = req;
  const results = await prisma.tags.findMany({
    where: {
      name: {
        contains: q as string,
        mode: "insensitive",
      },
    },
    select: {
      name: true,
    },
  });
  return res.status(200).json(results);
}
