import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <div className={'hidden md:block absolute left-0 -bottom-2/3 -z-10 h-full w-full rounded-full opacity-50 blur-[500px] bg-blue-500'} />
            <SignUp signInUrl='/sign-in' />
        </div>
    )
}