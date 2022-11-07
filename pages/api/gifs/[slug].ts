import { NextApiRequest, NextApiResponse } from 'next';
import { mapGif } from '@lib/mapping/gif';
import client from '@lib/prismadb';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  const gif = await client.gif.findUnique({
    where: {
      slug,
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
  if (!gif) {
    return {
      notFound: true,
    };
  }
  return res.status(200).json(mapGif(gif));
};
export default handler;
