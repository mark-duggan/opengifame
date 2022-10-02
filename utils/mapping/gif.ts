import type { Gif as modelGif } from "@models";
import { Gif } from "@prisma/client";

export const mapGif = (
  gif: Gif & { _count: { upVotes: number; downVotes: number } }
): modelGif => {
  return {
    id: gif.id,
    title: gif.title,
    description: gif.description,
    fileName: gif.fileName,
    dateCreated: gif.createdAt.toISOString(),
    upVotes: gif._count.upVotes,
    downVotes: gif._count.downVotes,
    hasVoted: false,
  };
};
