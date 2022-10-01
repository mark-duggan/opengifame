// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getBrowserId } from "utils/browser";
import qs from "querystring";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { gifId, isUp },
  } = req;
  const browserId = req.cookies.bid;
  if (!gifId || !browserId) {
    return res.status(400);
  }
  if (isUp === "1") {
    return _processUpvote(res, gifId as string, browserId);
  } else {
    return _processDownvote(res, gifId as string, browserId);
  }
}
const _processDownvote = async (
  res: NextApiResponse,
  gifId: string,
  browserId: string
) => {
  const prisma = new PrismaClient();
  //check for existing downvote
  const exists = await prisma.downVotes.count({
    where: {
      gifId: gifId,
      browserId: browserId,
    },
  });

  if (exists !== 0) {
    return res.status(403).json({
      message: "You have already downvoted on this gif",
    });
  }

  //delete any upvotes
  try {
    await prisma.upVotes.delete({
      where: {
        browserId_gifId: {
          gifId: gifId,
          browserId: browserId,
        },
      },
    });
  } catch {}
  const result = await prisma.downVotes.create({
    data: {
      browserId: browserId as string,
      gifId: gifId as string,
    },
  });
  return res.status(200).json(result);
};
const _processUpvote = async (
  res: NextApiResponse,
  gifId: string,
  browserId: string
) => {
  const prisma = new PrismaClient();
  //check for existing upvote
  const exists = await prisma.upVotes.count({
    where: {
      gifId: gifId,
      browserId: browserId,
    },
  });

  if (exists !== 0) {
    return res.status(403).json({
      message: "You have already upvoted this gif",
    });
  }

  //delete any downvotes
  try {
    await prisma.downVotes.delete({
      where: {
        browserId_gifId: {
          gifId: gifId,
          browserId: browserId,
        },
      },
    });
  } catch {}

  const result = await prisma.upVotes.create({
    data: {
      browserId: browserId as string,
      gifId: gifId as string,
    },
  });
  return res.status(200).json(result);
};
