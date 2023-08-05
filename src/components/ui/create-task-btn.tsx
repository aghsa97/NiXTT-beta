import { cn } from '@/lib/utils'
import React from 'react'

function CreateTaskBtn({ className }: { className?: string }) {
    return (
        <button className={cn('px-4 py-2 bg-main hover:bg-main/60 text-neutral-950 rounded-lg transition-main', className)}>
            + Create Task
        </button>
    )
}

export default CreateTaskBtn