import { taskPatchSchema } from "@/lib/validations/task";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    taskId: z.string().cuid(),
  }),
});

export async function PATCH(
  req: Request,
  cxt: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(cxt);

    if (!(await verifyUserAccessToTask(params.taskId))) {
      return new Response("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = taskPatchSchema.parse(json);

    await db.task.update({
      where: {
        id: params.taskId,
      },
      data: {
        ...body,
      },
    });

    return new Response("Updated", { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify(err.issues), { status: 400 });
    }

    return new Response("Server Error", { status: 500 });
  }
}

async function verifyUserAccessToTask(taskId: string) {
  const { userId } = auth();
  if (!userId) throw new Error("No user ID found");
  const count = await db.task.count({
    where: {
      id: taskId,
      ownerId: userId,
    },
  });

  return count > 0;
}
