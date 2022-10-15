import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prismadb';
import { logger } from '@lib/logger';
import { hashPassword } from '@lib/crypt';
import { omit } from 'lodash';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    logger.debug('creating user', {
      ...req.body,
      password: hashPassword(req.body.password),
    });
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
      },
    });
    res.json(omit(user, 'password'));
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
