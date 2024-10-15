import Image from 'next/image'
import Link from 'next/link'

import { CreateTransactionModal } from './CreateTransactionModal'

export function Header() {
  return (
    <div className="navbar px-4 bg-base-300">
      <div className="flex-1">
        <Link href="/" className="text-xl">
          FinTrack
        </Link>
      </div>

      <div className="flex gap-2.5">
        <CreateTransactionModal />

        <div className="dropdown dropdown-bottom dropdown-end flex">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost avatar btn-square"
          >
            <div className="w-10 rounded-md">
              <Image
                src="https://avatars.githubusercontent.com/u/69776883?s=96&v=4"
                alt="User image"
                width={40}
                height={40}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-md z-[1] mt-0 w-52 p-2 shadow"
          >
            <li>
              <Link href="/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
