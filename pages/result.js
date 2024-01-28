import { useContext } from 'react';
import ClickContext from '../contexts/click';
import { Directus } from '@directus/sdk';
import {useRouter} from 'next/router'
import uuid from 'react-uuid';

const directus = new Directus(process.env.DB_HOST, { auth: { staticToken: process.env.DB_TOKEN } });

async function createNewProspect(email, white, red, blue, orange, ff_uuid) {

  await directus.items('prospects').createOne(
    { uuid: ff_uuid, email: email, white: white, red: red, blue: blue, orange: orange},
    );
}

export default function Thanks() {

  const router = useRouter()


  const [
    white,
    red,
    blue,
    orange
  ] = useContext(ClickContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ff_uuid = uuid();
  
    const data = {
      email: event.target.email.value,
    }
    
    if (white == 0 && red == 0 && blue == 0 && orange == 0) {
      router.push("/")
      return
    }
  
    createNewProspect(data.email, white, red, blue, orange, ff_uuid)
  
    router.push(`/name?id=${ff_uuid}`)
    
  }

  return (
    <div className="mx-auto container w-full">
      <div>
      </div>
      <div className="grid place-items-center text-3xl">
        <div className="md:text-6xl text-6xl font-black text-center text-gray-800 dark:text-white leading-snug lg:w-3/4">
          <h2 className="py-20">Well done!</h2>
        </div>
        <div className="md:text-5xl text-2xl text-center leading-snug lg:w-3/4 px-5">
              <h2>What email should we send the results to?</h2>
            </div>
        <div className="xl:w-5/12 w-11/12 mx-auto mb-4 my-6 md:w-2/3 sm:px-10 sm:py-6 py-4 px-4 bg-white dark:bg-gray-800 rounded-md">
          <label htmlFor="email" className="text-sm text-gray-600 dark:text-gray-400 font-normal">
            Please enter your primary email address:
          </label>
          <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start sm:items-center sm:flex-row mt-4">
            <div className="relative w-full sm:w-2/3">
              <div className="absolute text-gray-600 dark:text-gray-400 flex items-center px-4 h-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <rect x={3} y={5} width={18} height={14} rx={2} />
                  <polyline points="3 7 12 13 21 7" />
                </svg>
              </div>
              <input type="email" id="email" className="py-3 text-gray-600 dark:text-gray-400 bg-transparent focus:outline-none focus:border focus:bg-white font-normal w-full pl-16 text-sm border-gray-300 dark:border-gray-700 rounded border shadow" placeholder="youremail@example.com" required/>
            </div>
            <button type="submit" className="mt-4 sm:mt-0 sm:ml-4 focus:outline-none bg-black transition duration-150 ease-in-out hover:bg-black rounded text-white px-8 py-3 text-sm">Submit</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}