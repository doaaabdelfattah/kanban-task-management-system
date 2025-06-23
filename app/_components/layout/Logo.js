import Image from "next/image";
import Link from "next/link";
import logoLight from '@/public/assets/logo-light.svg';
import logoDark from '@/public/assets/logo-dark.svg';

function Logo() {
  return (
    <Link href="/" className="flex items-center">
      {/* Light Mode Logo */}
      <Image
        src={logoDark}
        height={150}
        width={150}
        quality={100}
        alt="Kanban Management System Light"
        className="block dark:hidden"
      />

      {/* Dark Mode Logo */}
      <Image
        src={logoLight}
        height={150}
        width={150}
        quality={100}
        alt="Kanban Management System Dark"
        className="hidden dark:block"
      />
    </Link>
  );
}

export default Logo;
