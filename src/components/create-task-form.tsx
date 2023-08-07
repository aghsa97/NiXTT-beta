"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useState } from "react"
import * as z from "zod"


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { TaskFormSchema } from "@/lib/schemas/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { DatePicker } from "./ui/date-picker"
import { Separator } from "./ui/separator"
import { Progress } from "./ui/progress"
import { Icons } from "./icons"




export function TaskForm() {
    const [isSaving, setIsSaving] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof TaskFormSchema>>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: {
            title: "",
            dueDate: new Date(),
            dueTime: ""
        }
    })
    const title = form.watch('title')

    // format the date as "YYYY-MM-DDTHH:MM:SS"
    function formatDate(date: Date, time: string) {
        const dueDate = new Date(date)
        if (!time) return dueDate.toISOString()
        const [hours, minutes] = time.split(':').map((n) => Number(n))
        dueDate.setHours(hours)
        dueDate.setMinutes(minutes)
        return dueDate.toISOString()
    }

    // format the dueString as "DD MMM HH:MM" or "DD MMM DDD"
    function formatDueString(date: Date, time: string) {
        if (!time) {
            return date.toLocaleString('en-US', {
                day: '2-digit',
            }) + ' ' + date.toLocaleString('en-US', {
                month: 'short',
            }) + ', ' + date.toLocaleString('en-US', {
                weekday: 'short',
            })
        }
        return date.toLocaleString('en-US', {
            day: '2-digit',
        }) + ' ' + date.toLocaleString('en-US', {
            month: 'short',
        }) + ', ' + time
    }

    async function onSubmit(data: z.infer<typeof TaskFormSchema>) {
        setIsSaving(true)
        const date = formatDate(data.dueDate, data.dueTime)
        const dueString = formatDueString(data.dueDate, data.dueTime)
        const respons = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: data.title,
                date,
                dueString
            })
        })
        setIsSaving(false)

        if (!respons.ok) {
            if (respons.status === 402) {
                return toast({
                    title: "You have reached your task limit",
                    description: respons.text(),
                    variant: "destructive",
                })
            }
            return toast({
                title: "Something went wrong",
                description: respons.text(),
                variant: "destructive",
            })
        }
        router.refresh()
        return toast({
            title: "Task created successfully",
        })
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task name</FormLabel>
                            <FormControl>
                                <Input placeholder="eg, Dinner with friends" className="dark:bg-neutral-200" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-start justify-between gap-4">
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <DatePicker value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormDescription>
                                    By default, the date is set to today.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dueTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time</FormLabel>
                                <FormControl>
                                    <Input placeholder="eg, 20:00" className="dark:bg-neutral-200" maxLength={5} {...field} />
                                </FormControl>
                                <FormDescription>
                                    Europe/Stockholm
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="h-10 flex flex-row-reverse items-center gap-6">
                    <Button type="submit" disabled={title.length > 100 || isSaving} variant="secondary" >
                        {isSaving && <Icons.spinner className="w-5 h-5 mr-2 animate-spin" />}
                        Create task
                    </Button>
                    <Separator orientation="vertical" className="h-4/6 bg-neutral-950/20" />
                    <div className={cn("relative w-8 h-8 flex items-center justify-center text-neutral-950 font-medium text-sm", title.length >= 85 && 'text-yellow-600', title.length > 100 && 'text-red-600')}>
                        <Progress value={title.length} className={"absolute -z-10 w-10 h-10 rounded-full"} />
                        {title.length > 100 ? 100 - title.length : title.length}
                    </div>
                </div>
            </form>
        </Form>
    )
}
