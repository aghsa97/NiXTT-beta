import Background from "@/components/background";
import { SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <Background>
      <main className="w-full max-w-screen-2xl mx-auto flex flex-col xl:flex-row min-h-screen items-center justify-center gap-6 py-10 md:py-0">
        <div className="w-full xl:w-3/5 flex flex-col items-center justify-center z-10 p-4">
          <svg width="333" height="70" viewBox="0 0 253 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.23999 70H15.024V43.216C15.024 36.1371 14.6093 29.8598 13.7799 24.3844H0.23999V70ZM14.352 25.552L13.9783 24.3844H27.2055L31.536 32.08C33.648 35.856 35.472 39.408 37.008 42.736C38.608 46 39.632 48.304 40.08 49.648L40.848 51.76C40.208 47.024 39.888 40.464 39.888 32.08V24.3844H54.672V70H38.448L22.992 43.216C20.944 39.76 19.12 36.368 17.52 33.04C15.984 29.648 14.928 27.152 14.352 25.552ZM0.23999 16.3799H22.7011L16.464 5.29602H0.23999V16.3799ZM54.672 16.3799H39.888V5.29602H54.672V16.3799ZM67.1775 70H81.1935V21.328H67.1775V70ZM90.0607 70H107.917L119.245 49.84L130.957 70H148.525L127.693 37.264L135.295 24.8552H118.343V23.1291L108.205 5.29602H91.0207L110.509 37.168L90.0607 70ZM122.953 16.8507H140.198L147.277 5.29602H129.229L122.953 16.8507ZM169.845 24.8552V70H184.725V24.8552H169.845ZM200.469 16.8507H154.005V5.29602H200.469V16.8507ZM222.064 24.8552V70H236.944V24.8552H222.064ZM252.688 16.8507H206.224V5.29602H252.688V16.8507Z" fill="#0a0a0a" />
            <path d="M82.255 8.37988C82.255 12.7982 78.6733 16.3799 74.255 16.3799C69.8367 16.3799 66.255 12.7982 66.255 8.37988C66.255 3.9616 69.8367 0.379883 74.255 0.379883C78.6733 0.379883 82.255 3.9616 82.255 8.37988Z" fill="#AE4C83" />
          </svg>
          <div className="text-center flex flex-col gap-2">
            <div className="rounded-full mx-auto bg-neutral-950 px-2 py-1 mt-16">
              <p className="text-xs text-neutral-100 font-semibold">Coming soon ✨</p>
            </div>
            <div className="flex flex-col items-center justify-center md:gap-2">
              <h1 className="text-2xl md:text-6xl tracking-tighter font-bold">Just another <span className="text-main-accent">to-do list app</span></h1>
            </div>
          </div>
        </div>
        <div className="w-full xl:w-2/5 flex items-center justify-center">
          <SignIn signUpUrl='/sign-up' />
        </div>
      </main>
    </Background>

  )
}
