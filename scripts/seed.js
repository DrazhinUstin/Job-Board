const { categories } = require('./placeholder-data');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    categories.map((category) =>
      prisma.category.upsert({ where: { name: category.name }, update: category, create: category })
    )
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error('Failed to seed db', err);
    await prisma.$disconnect();
    process.exit(1);
  });
