import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prismadb";
import { mapGif } from "@lib/mapping/gif";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { q },
  } = req;
  if (q && q.length > 3) {
    const results = await prisma.tags.findMany({
      where: {
        name: {
          contains: q as string,
        },
      },
      select: {
        name: true,
      },
    });
    return res.status(200).json(results);
  }
  return res.status(400);
}
