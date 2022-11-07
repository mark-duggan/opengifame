import { NextApiRequest, NextApiResponse } from 'next';
import { Gif } from '@models';
import { mapGif } from '@lib/mapping/gif';
import client from '@lib/prismadb';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({
      data: null,
      error: 'Method Not Allowed',
    });
  }
  const results = await client.gif.findMany({
    take: 12,
    include: {
      _count: {
        select: {
          upVotes: true,
          downVotes: true,
        },
      },
    },
    orderBy: {
      upVotes: {
        _count: 'desc',
      },
    },
  });
  const gifs = results.map((gif) => mapGif(gif));
  return res.status(200).json(gifs);
};
export default handler;
