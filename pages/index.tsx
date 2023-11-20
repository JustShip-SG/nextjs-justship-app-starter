import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly">
      <h1 className="text-6xl font-bold text-center text-light-purple">Welcome to Justship</h1>
      <Image
        src="/logo.png"
        alt="Justship logo"
        width={120}
        height={120}
      />
      <Link href="/dashboard">
        <span className={
          classNames("text-2xl font-bold text-center text-light-purple",
            "cursor-pointer hover:text-dark-purple flex items-center group")}>
          Go to Dashboard
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-8 inline-block group-hover:animate-sidebounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
              strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </main>
  )
}
