import { useRouter } from 'next/router'
import { Stream } from "@cloudflare/stream-react";
import BlueClear from "../../ui/data/blue-clear";
import BlueRed from "../../ui/data/blue-red";
import Blue from "../../ui/data/blue";
import Clear from "../../ui/data/clear";
import Red from "../../ui/data/red";
import Orange from "../../ui/data/orange";
import OrangeClear from "../../ui/data/orange-clear";
import OrangeBlue from "../../ui/data/orange-blue";
import OrangeRed from "../../ui/data/orange-red";
import RedClear from "../../ui/data/red-clear";
import Link from 'next/link'


export default function Videos() {
  const router = useRouter()
  const { vid } = router.query;

  const url = new URL('https://quiz.markbunting.co.nz' + router.asPath);
  const id = url.searchParams.get('id')

  const blueClearVideoId = "06e7beebad91e01035ef111cd5515ef7";
  const blueRedVideoId = "33dcf821d7fd5528722e4ff461e89731";
  const blueVideoId = "992cce90d9999c5668e1d40c04e6c86c";
  const clearVideoId = "4f650fdfd619b99d1ffb8f047b483afb";
  const orangeClearVideoId = "e8023c26f0af17bded7656c534904c74";
  const orangeRedVideoId = "a3168bcd221bf334c76168ab9dcf34da";
  const orangeVideoId = "8941420ec870deef24ce7554edb28c70";
  const redClearVideoId = "d6c6097737b99b506d482d55a5a7767d";
  const redVideoId = "8f9d9b25ca179cd41f0982eb4d71c87a";
  const orangeBlueVideoId = "86313c85c3e4c525d9a0924ed72974a8";

  var data;
  var video;

  switch (vid) {
    case "1":
      data = <BlueClear />
      video = blueClearVideoId
      break;
    case "2":
      data = <BlueRed />
      video = blueRedVideoId
      break;
    case "3":
      data = <Blue />
      video = blueVideoId
      break;
    case "4":
      data = <Clear />
      video = clearVideoId
      break;
    case "5":
      data = <OrangeClear />
      video = orangeClearVideoId
      break;
    case "6":
      data = <OrangeRed />
      video = orangeRedVideoId
      break;
    case "7":
      data = <Orange />
      video = orangeVideoId
      break;
    case "8":
      data = <RedClear />
      video = redClearVideoId
      break;
    case "9":
      data = <Red />
      video = redVideoId
      break;
      case "10":
        data = <OrangeBlue />
        video = orangeBlueVideoId
        break;
    default:
      break;

  }

  return (
    <div className='bg-slate-50 min-h-full'>
      <div className="bg-slate-50 md:px-6 px-0 mx-auto container w-full">
        <div className='flex justify-center pb-0 md:pb-20 bg-slate-50'>
          <div className="max-w-[552px] bg-white md:mt-10 pt-0">
            <div className='min-h-[210px] md:min-h-[310px] bg-black'>
              <Stream
                controls
                src={video}
                responsive={true}
              />
            </div>
            <KereButton id={id} />
            <div className='max-w-[552px] p-10'>
              {data}
            </div>
            <KereButton />
          </div>
        </div>
      </div>
    </div>
  )
}

function KereButton({id}) {
  return (<div className='w-full bg-yellow-50 p-8 text-center'>
    <Link href={{pathname: `/next`, query: {id: id}}} >
    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Full Flames Assessment
      <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
      </svg>
    </button>
    </Link>
  </div>)
}


export async function getStaticPaths() {
  const vids = ["1", "2", "3","4", "5", "6", "7", "8", "9"]

  const paths = vids.map(v => {

    return {
      params: {
        vid: v,
      },
    };
  });

  return {
    fallback: 'blocking',
    paths: paths,
  }
}

export async function getStaticProps() {
  
  const q = {}

  return {
    props: {
      q
    },
  };
}