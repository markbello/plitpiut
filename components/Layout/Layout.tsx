import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 flex h-20 items-center justify-between border border-b bg-white p-4 shadow-sm">
        <div className="hover:cursor-pointer">
          <Image
            src="/images/plitpiut-logo.png"
            alt="Plitpiut Logo"
            width={144}
            height={144}
          />
        </div>
        <div className="flex items-center">
          <div className="mr-4 block cursor-pointer">View Profile</div>
        </div>
      </header>
      <main className="flex min-h-full grow bg-slate-50">{children}</main>
    </div>
  )
}

export default Layout
