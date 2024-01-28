import { Stream } from "@cloudflare/stream-react";

// End
export default function End() {

  const videoIdOrSignedUrl = "770d5d610282b3b57557c0bf8ec629a9";

  return (
    <div className="mx-auto container w-full bg-black h-full">
      <div className="grid place-items-center text-3xl h-full pb-36">
        <div className="md:text-6xl text-6xl font-black text-center text-gray-800 dark:text-white leading-snug lg:w-3/4">
          <h2 className="pt-20 pb-12 font-bold text-white">Thank you.</h2>
        </div>
        <div className="md:text-5xl text-2xl text-center leading-snug lg:w-3/4 px-5 text-white">
          <div>
            <Stream 
              controls 
              src={videoIdOrSignedUrl} 
              responsive={true}
              />
          </div>
          <h2 className="pt-12">Your results are being generated and will be sent to the email address provided within the next few minutes.</h2>
        </div>
      </div>
    </div>
  )
}