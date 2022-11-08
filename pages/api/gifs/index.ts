import { NextApiRequest, NextApiResponse } from 'next';
import { mapGif } from '@lib/mapping/gif';
import client from '@lib/prismadb';
import { logger } from '@lib/logger';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  logger.info('index', 'gifs', req);
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
  logger.info('index', 'gifs_mapping', results);
  const gifs = results.map((gif) => mapGif(gif));
  logger.info('index', 'gifs_json', gifs);
  return res.status(200).json(gifs);
};
export default handler;
