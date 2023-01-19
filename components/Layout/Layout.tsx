import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'
import Head from 'next/head'
import Spinner from '../Spinner'
import Link from 'next/link'

const Layout: FC<
  PropsWithChildren<{
    title?: string
    description?: string
    isLoading: boolean
  }>
> = ({
  children,
  isLoading,
  title = 'Plitpiut',
  description = 'No description provided'
}) => {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen flex-col bg-white">
        <header className="sticky top-0 flex h-20 items-center justify-between border border-b bg-white p-4 shadow-sm">
          <Link href="/" className="hover:cursor-pointer">
            <Image
              src="/images/plitpiut-logo.png"
              alt="Plitpiut Logo"
              width={144}
              height={144}
            />
          </Link>
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
