// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";
import {getBrowserId} from "utils/browser";
import qs from 'querystring'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        query: {gifId, isUp},
    } = req;
    const prisma = new PrismaClient();
    const browserId = req.cookies.bid;

    const exists = await prisma.votes.count({
        where: {
            gifId: gifId as string,
            browserId: browserId,
        },
    });

    if (exists !== 0) {
        res.status(403).json({
            message: "You have already voted on this gif",
        });
    }
    const result = await prisma.votes.create({
        data: {
            isUp: isUp === "1",
            browserId: browserId as string,
            gifId: gifId as string,
        },
    });
    res.status(200).json(result);
}
