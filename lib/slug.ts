import { logger } from './logger';
import client from './prismadb';

export const titleToSlug = async (title: string): Promise<string> => {
  const slug = _getSlug(title);
  let candidate = slug;
  let i = 1;
  while (
    (await client.gif.findUnique({
      where: {
        slug: candidate,
      },
    })) !== null
  ) {
    candidate = `${slug}-${i++}`;
  }
  return candidate;
};
const _getSlug = (title: string): string => {
  let slug;

  // convert to lower case
  slug = title.toLowerCase();

  // remove special characters
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ''
  );
  // The /gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string

  // replace spaces with dash symbols
  slug = slug.replace(/ /gi, '-');

  // remove consecutive dash symbols
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');

  // remove the unwanted dash symbols at the beginning and the end of the slug
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
};
