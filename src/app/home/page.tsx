import { redirect } from "next/navigation"

import CreateTaskBtn from '@/components/ui/create-task-btn'
import { db } from '@/lib/db'

import { auth } from '@clerk/nextjs'
import { days } from "@/lib/constants"
import CompleteBtn from "@/components/ui/complete-task-btn"


async function getTasks() {
    const { userId } = auth()

    if (!userId) {
        redirect("/sing-in")
    }

    const response = await db.task.findMany({
        where: {
            ownerId: userId,
        },
        select: {
            id: true,
            title: true,
            done: true,
            date: true,
            dueString: true,
        },
        orderBy: {
            date: 'asc',
        },
    })
    return response
}

async function HomePage() {
    const data = await getTasks()

    const completedTasks = data.filter(todo => todo.done)
    const toDoTasks = data.filter(todo => !todo.done)

    if (data.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className=" text-3xl font-medium text-neutral-950">
                        Start your day by creating a new task <span className="text-neutral-950">🚀</span>
                    </h1>
                    <CreateTaskBtn />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col md:flex-row divide-x divide-neutral-200">
            <div className='w-1/2 flex flex-col px-10 pt-10'>
                <header className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <h1 className='text-5xl font-light'>{new Date().getDate()}</h1>
                        <div className="flex flex-col items-start justify-center">
                            <p className='text-neutral-950'>{days[new Date().getDay()]}</p>
                            <p className='text-neutral-950/40'>{new Date().toLocaleString('en-US', { month: 'long' })} {new Date().getFullYear()}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <CreateTaskBtn className='px-6 py-3 rounded-full ' />
                    </div>
                </header>
                <div className="flex flex-col gap-5 mt-10 overflow-y-scroll">
                    {toDoTasks.length > 0 ? toDoTasks.map((todo, index) => (
                        <div key={index} className="flex items-start justify-between border-b pb-4 gap-2">
                            <div className="w-full max-w-lg flex flex-col justify-center items-start gap-2">
                                <h1 className="text-neutral-950 font-medium">
                                    {todo.title}
                                </h1>
                                <p className="text-sm text-neutral-950/40">
                                    {todo.dueString}
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <CompleteBtn completed={todo.done} taskId={todo.id} className="w-10 h-10 bg-main-secondary/60 border-neutral-300" />
                            </div>
                        </div>
                    )) : (
                        <div className="flex flex-col items-center justify-between border-b pb-4 gap-2">
                            <h2 className="text-2xl font-medium">You don&apos;t have any tasks for today</h2>
                            <p className="text-sm text-neutral-950/60">Create a new task by clicking the button above.</p>
                        </div>
                    )}
                </div>
            </div>
            <div className='w-1/2 flex flex-col px-10 pt-10'>
                <header className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <h1 className='text-5xl font-light'>Completed</h1>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center bg-main rounded-full">
                        <p className="text-2xl font-light">
                            {completedTasks.length}
                        </p>
                    </div>
                </header>
                <div className="flex flex-col gap-5 mt-10 overflow-y-scroll">
                    {completedTasks.length > 0 ? completedTasks.map((todo, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-4 gap-2">
                            <div className="w-full max-w-lg flex flex-col justify-center items-start gap-2">
                                <h1 className="text-neutral-950 font-medium line-through decoration-neutral-950/80">
                                    {todo.title}
                                </h1>
                                <p className="text-sm text-neutral-950/40">
                                    {todo.dueString}
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <CompleteBtn completed={todo.done} taskId={todo.id} className="w-10 h-10 bg-main-secondary/60 border-neutral-300" />
                            </div>
                        </div>
                    )) : (
                        <div className="flex flex-col items-center justify-between border-b pb-4 gap-2">
                            <h2 className="text-2xl font-medium">You don&apos;t have any completed tasks</h2>
                            <p className="text-sm text-neutral-950/60 text-center">
                                You can complete a task by clicking the check button.
                            </p>
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export default HomePage