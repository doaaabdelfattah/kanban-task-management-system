import Image from "next/image"
import Link from "next/link"
import logo from '@/public/assets/logo-dark.svg'

function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image src={logo} height='150' width='150' quality={100} alt="kanban managemnent system " />
    </Link>
  )
}

export default Logo
