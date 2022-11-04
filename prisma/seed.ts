import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { titleToSlug } from '@lib/slug';

const prisma = new PrismaClient();
type Episode = {
  season: number;
  episode: number;
  name: string;
  air_date: string;
};
const episodes: Episode[] = [];

const tags = [
  'Frasier',
  'Niles',
  'Eddie',
  'Daphne',
  'Roz',
  'Bulldog',
  'Noel',
  'Kenny',
  'Wine',
  'Sherry',
];

async function main() {
  //add admin user
  const adminUser = process.env.ADMIN_USER as string;
  const adminPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD as string,
    0
  );
  console.log('seed', 'creating user', adminUser);

  const user = await prisma.user.upsert({
    where: {
      email: adminUser,
    },
    update: {
      password: adminPassword,
    },
    create: {
      email: adminUser,
      password: adminPassword,
    },
  });
  for (const tag of tags) {
    const newTag = await prisma.tags.upsert({
      where: {
        name: tag,
      },
      update: {},
      create: {
        name: tag,
        userId: user.id,
      },
    });
  }
  //add seasons and episodes
  for (const e of episodes) {
    const season = await prisma.season.upsert({
      where: { number: e.season },
      update: {},
      create: {
        number: e.season,
      },
    });
    const episode = await prisma.episode.upsert({
      where: {
        number_seasonId: {
          number: e.episode,
          seasonId: season.id,
        },
      },
      update: {},
      create: {
        number: e.episode,
        name: e.name,
        airDate: new Date(Date.parse(e.air_date)),
        seasonId: season.id,
      },
    });
    console.log('seed', episode);
  }
  const gifs = await prisma.gif.findMany();
  for (const gif of gifs) {
    if (!gif.slug) {
      gif.slug = titleToSlug(gif.title);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e), await prisma.$disconnect();
    process.exit(1);
  });
