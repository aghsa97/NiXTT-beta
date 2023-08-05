'use client'

import React from 'react'

import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { playSound } from '@/lib/utils'

import { useRouter } from 'next/navigation'
import { toast } from './use-toast'

type Props = {
    taskId: string
    completed: boolean
    className?: string
}

function CompleteBtn({ completed, taskId, className }: Props) {
    const router = useRouter()
    async function onClick() {
        const respons = await fetch(`/api/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                done: !completed,
            }),
        })
        if (!respons.ok) {
            return toast({
                title: 'Something went wrong',
                description: 'Please try again later',
                variant: 'destructive'
            })
        }
        router.refresh()
        playSound()
        return toast({
            title: completed ? 'Task marked as incomplete' : 'Task completed',
        })
    }

    return (
        <button className={cn('w-8 h-8 flex items-center justify-center rounded-full group',
            completed ? 'bg-green-40 hover:bg-rose-40' : 'bg-transparent transition-main',
            className
        )}
            onClick={() => onClick()}
        >
            {completed ? (
                <>
                    <Icons.checkMark className='w-5 h-5 text-green-600 group-hover:hidden' />
                    <Icons.xMark className='w-5 h-5 text-rose-600 hidden group-hover:flex' strokeWidth={1.5} />
                </>
            ) : (
                <Icons.checkMark strokeWidth={3} className='w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:text-green-600' />
            )}
        </button>
    )
}

export default CompleteBtn