import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/logo.png'

export default function Home() {
  return (
      <div className="">
        <section className="mx-auto container w-full px-3">
          <div className="flex flex-col justify-center items-center">
            <div className="md:text-5xl text-4xl font-black text-center text-gray-800 dark:text-white leading-snug lg:w-3/4">
            <Image width={320} height={213} src={logo} quality={100} />
              <h2>15 Fast Flames</h2>
            </div>
            <div className="md:text-5xl pt-8 text-3xl text-center text-gray-800 dark:text-white leading-snug lg:w-3/4">
              <h2>Answer with the one that is most like you.</h2>
            </div>
            <div className="flex justify-center items-center mt-16">
              <Link href="/q/1">
              <button className="focus:outline-none 
                            focus:ring-2 
                            focus:ring-offset-2 
                            focus:ring-[#212C66] 
                            hover:opacity-90 
                            w-48 
                            h-12 
                            text-lg 
                            text-white 
                            bg-gradient-to-l 
                            bg-[#212C66] 
                            rounded"
              >Start</button></Link>
            </div>
          </div>
        </section>
      </div>
  )
}

