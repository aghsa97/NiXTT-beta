import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const task1 = await prisma.task.create({
    data: {
      title: "Task 1",
      done: true,
      ownerId: "user_2TTaShPFIOdV5o3Zhoknn1Ri5pS",
      date: new Date("2023-08-04T20:00:00.000Z"),
      dueString: "4 Aug 20:00",
    },
  });
  const task2 = await prisma.task.create({
    data: {
      title: "Task 2",
      done: false,
      ownerId: "user_2TTaShPFIOdV5o3Zhoknn1Ri5pS",
      date: new Date("2023-08-04T21:30:00.000Z"),
      dueString: "4 Aug 21:30",
    },
  });
  const task3 = await prisma.task.create({
    data: {
      title: "Task 3",
      done: false,
      ownerId: "user_2TTaShPFIOdV5o3Zhoknn1Ri5pS",
      date: new Date("2023-08-05T20:00:00.000Z"),
      dueString: "5 Aug 20:00",
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
