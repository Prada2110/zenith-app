import Image from "next/image";


export default function Logo() {
  return (
    <Image 
        src="/logo-zenith.svg"
        alt="Logo zenithapp"
        width={266}
        height={266}
        className="w-full"
        priority
    />
  )
}
