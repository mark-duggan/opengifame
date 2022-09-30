import {PrismaClient} from "@prisma/client";
import type {GetServerSideProps, NextPage} from "next";
import {Gif} from "models"
import {GifContainer} from "components";
import {getBrowserId} from "../utils/browser";

interface IHomeProps {
    gifs: Gif[]
}

const Home: NextPage<IHomeProps> = ({gifs}) => {
    return (
        <div>
            <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {gifs.map((gif: Gif) => {
                    return (
                        <div key={gif.id} className="m-2">
                            <GifContainer gif={gif}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const browserId = getBrowserId(req.headers.cookie || '');
    const prisma = new PrismaClient();

    const results = await prisma.gif.findMany({
        take: 12, orderBy: {title: 'asc'},
        include: {
            _count: {
                select: {
                    votes: {where: {isUp: true}},
                    // votes: { where: { isUp: false } }, //how to achieve
                }
            }
        }
    });
    const gifs = await Promise.all(results.map(async (gif): Promise<Gif> => {
        const votes = await prisma.votes.count({
            where: {
                gifId: gif.id as string,
                browserId: browserId,
            },
        })
        const upVotes = await prisma.votes.count({
            where: {
                gifId: gif.id as string,
                browserId: browserId,
                isUp: true
            },
        })
        const downVotes = await prisma.votes.count({
            where: {
                gifId: gif.id as string,
                browserId: browserId,
                isUp: false
            },
        })
        return {
            id: gif.id,
            title: gif.title,
            description: gif.description,
            fileName: gif.fileName,
            dateCreated: gif.createdAt.toISOString(),
            upVotes: upVotes,
            downVotes: downVotes,
            hasVoted: votes !== 0
        }
    }))
    return {
        props: {
            gifs
        }
    };
};
export default Home;
