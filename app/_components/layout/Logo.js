import Image from "next/image"
import Link from "next/link"
import logo from '@/public/assets/logo-dark.svg'

function Logo() {
  return (
    // <div className="w-[19rem] pl-9 flex items-center border-r-light-lines border-r-1">

    <Link href="/" className="flex items-center">
      <Image src={logo} height='150' width='150' quality={100} alt="kanban managemnent system " />
    </Link>
    // </div>
  )
}

export default Logo
