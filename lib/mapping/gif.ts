import type { Gif as modelGif } from '@models';
import { Gif } from '@prisma/client';

export const mapGif = (
  gif: Gif & { _count: { upVotes: number; downVotes: number } }
): modelGif => {
  return {
    id: gif.id,
    slug: gif.slug,
    title: gif.title,
    description: gif.description,
    fileName: `/uploads/${gif.id}.gif`,
    searchTerms: gif.searchTerms,
    dateCreated: gif.createdAt.toISOString(),
    upVotes: gif._count.upVotes,
    downVotes: gif._count.downVotes,
    hasVoted: false,
    fixedEmbedCode: `<iframe title="${gif.title}" width="800" height="600" frameBorder="0" src="https://dev.fergl.ie:3000/share/${gif.slug}">`,
    responsiveEmbedCode: `<iframe title="${gif.title}" width="800" height="600" frameBorder="0" src="https://dev.fergl.ie:3000/share/${gif.slug}">`,
  };
};
