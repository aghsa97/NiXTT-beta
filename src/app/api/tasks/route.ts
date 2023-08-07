import { taskPostSchema } from "@/lib/validations/task";
import { RequiresProPlanError } from "@/lib/exceptions";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const count = await db.task.count({
      where: {
        ownerId: userId,
      },
    });

    if (count >= 10) {
      throw new RequiresProPlanError();
    }

    const json = await req.json();
    const body = taskPostSchema.parse(json);

    await db.task.create({
      data: {
        title: body.title,
        date: body.date,
        dueString: body.dueString,
        ownerId: userId,
        done: false,
      },
    });

    return new Response("Created", { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify(err.issues), { status: 400 });
    }
    if (err instanceof RequiresProPlanError) {
      return new Response(err.message, { status: 402 });
    }
    return new Response("Server Error", { status: 500 });
  }
}
