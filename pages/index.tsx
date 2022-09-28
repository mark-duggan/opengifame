import { PrismaClient } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { Gif } from "../models";
import Image from "next/image";

interface IHomeProps {
    gifs: Gif[]
}

const Home: NextPage<IHomeProps> = ({ gifs }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-red-700 underline">
                Frasier Gifs
            </h1>
            <div className="grid grid-cols-3">
                {gifs.map((gif: Gif) => {
                    return (
                        <div key={gif.id}>
                            <h2>{gif.title}</h2>
                            <Image alt={gif.title} width={64} height={64} src={`/samples/${gif.fileName}.gif`} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const prisma = new PrismaClient();
    const gifs = await prisma.gif.findMany({
        take: 12, orderBy: { title: 'asc' },
    });

    return { props: { gifs: JSON.parse(JSON.stringify(gifs)) } };
};
export default Home;
