import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prismadb';
import { confirmPassword, hashPassword } from '@lib/crypt';
import { logger } from '@lib/logger';
import { omit } from 'lodash';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    if (
      user?.password &&
      (await confirmPassword(user.password, req.body.password))
    ) {
      logger.debug('password correct');
      res.json(omit(user, 'password'));
    } else {
      logger.debug('incorrect credentials');
      res.status(400).end('Invalid credentials');
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
