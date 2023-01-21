import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'
import Head from 'next/head'
import Spinner from '../Spinner'
import Link from 'next/link'

const Layout: FC<
  PropsWithChildren<{
    title: string
    description?: string
    isLoading?: boolean
    ogImage?: string
  }>
> = ({
  children,
  isLoading,
  title = 'Plitpiut',
  description = 'No description provided',
  ogImage = ''
}) => {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        <meta name="description" content={description} />
        <meta name="og:image" content={ogImage} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen flex-col bg-white">
        <header className="sticky top-0 flex h-20 items-center justify-between border border-b bg-white p-4 shadow-sm">
          <Link href="/">
            <Image
              src="/images/plitpiut-logo.png"
              alt="Plitpiut Logo"
              width={144}
              height={144}
            />
          </Link>
          <a
            href="https://www.youtube.com/watch?v=M_Zu7wb4lw8"
            title="Visit Plitpiut on YouTube"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/images/youtube.png"
              alt="Visit Plitpiut on YouTube"
              width={32}
              height={16}
            />
          </a>
        </header>
        <main className="flex min-h-full grow bg-slate-50">
          {isLoading ? (
            <div className="w-full flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>{children}</>
          )}
        </main>
      </div>
    </>
  )
}

export default Layout
