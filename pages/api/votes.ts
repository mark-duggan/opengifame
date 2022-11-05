// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { mapGif } from '@lib/mapping/gif';
import client from '@lib/prismadb';

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
  if (isUp === '1') {
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
  //check for existing downvote
  const exists = await client.downVotes.count({
    where: {
      gifId: gifId,
      browserId: browserId,
    },
  });

  if (exists !== 0) {
    return res.status(403).json({
      message: 'You have already downvoted on this gif',
    });
  }

  //delete any upvotes
  try {
    await client.upVotes.delete({
      where: {
        browserId_gifId: {
          gifId: gifId,
          browserId: browserId,
        },
      },
    });
  } catch {}
  const result = await client.downVotes.create({
    data: {
      browserId: browserId as string,
      gifId: gifId as string,
    },
  });
  const response = await client.gif.findUnique({
    where: {
      id: gifId,
    },
    include: {
      _count: {
        select: {
          upVotes: true,
          downVotes: true,
        },
      },
    },
  });
  if (response !== null) {
    return res.status(200).json(mapGif(response));
  }
  return res.status(404);
};
const _processUpvote = async (
  res: NextApiResponse,
  gifId: string,
  browserId: string
) => {
  //check for existing upvote
  const exists = await client.upVotes.count({
    where: {
      gifId: gifId,
      browserId: browserId,
    },
  });

  if (exists !== 0) {
    return res.status(403).json({
      message: 'You have already upvoted this gif',
    });
  }

  //delete any downvotes
  try {
    await client.downVotes.delete({
      where: {
        browserId_gifId: {
          gifId: gifId,
          browserId: browserId,
        },
      },
    });
  } catch {}

  const result = await client.upVotes.create({
    data: {
      browserId: browserId as string,
      gifId: gifId as string,
    },
  });

  const response = await client.gif.findUnique({
    where: {
      id: gifId,
    },
    include: {
      _count: {
        select: {
          upVotes: true,
          downVotes: true,
        },
      },
    },
  });
  if (response !== null) {
    return res.status(200).json(mapGif(response));
  }
  return res.status(404);
};
