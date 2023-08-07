import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const task1 = await prisma.task.create({
    data: {
      title: "Go to the gym",
      done: true,
      ownerId: "user_2TTaShPFIOdV5o3Zhoknn1Ri5pS",
      date: new Date("2023-08-04T18:00:00.000Z"),
      dueString: "4 Aug, 20:00",
    },
  });
  const task2 = await prisma.task.create({
    data: {
      title: "Meet with friends",
      done: false,
      ownerId: "user_2TTaShPFIOdV5o3Zhoknn1Ri5pS",
      date: new Date("2023-08-04T21:30:00.000Z"),
      dueString: "4 Aug, Fri",
    },
  });
  const task3 = await prisma.task.create({
    data: {
      title: "Go to the dentist",
      done: false,
      ownerId: "user_2TTaShPFIOdV5o3Zhoknn1Ri5pS",
      date: new Date("2023-08-05T11:00:00.000Z"),
      dueString: "5 Aug, 13:00",
    },
  });

  console.log({ task1, task2, task3 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
