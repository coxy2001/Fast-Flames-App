import { useRouter } from 'next/router'
import { Directus } from '@directus/sdk';

const directus = new Directus(process.env.DB_HOST, { auth: { staticToken: process.env.DB_TOKEN } });

async function updateProspect(data) {

  const prospect = await directus.items('prospects').readByQuery({
    search: data.uuid,
    filter: {
      uuid: {
        _eq: data.uuid,
      },
    }
  });

  await directus.items('prospects').updateOne(prospect.data[0].id, {name: data.name});
}

export default function Name() {

  const router = useRouter()
  const uuid = router.query.id;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value,
      uuid: uuid
    }

    updateProspect(data)

    router.push("/end")

  }

  return (
    <div className="mx-auto container w-full">
      <div>
      </div>
      <div className="grid place-items-center text-3xl">
        <div className="md:text-6xl text-6xl font-black text-center text-gray-800 dark:text-white leading-snug lg:w-3/4">
          <h2 className="py-20 text-red-600">Oops!</h2>
        </div>
        <div className="md:text-5xl text-2xl text-center leading-snug lg:w-3/4 px-5">
          <h2>One more thing - we never asked for your name, how rude!</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 my-6 sm:px-10 sm:py-6 py-4 px-4 bg-white dark:bg-gray-800 rounded-md">
            <label htmlFor="email" className="text-sm text-gray-600 dark:text-gray-400 font-bold">
              What do you prefer to be called?
            </label>
            <div className="flex flex-col items-start sm:items-center sm:flex-row mt-4">
              <div className="relative w-full sm:w-2/3">
                <input
                  id="name"
                  placeholder="Preferred name"
                  required
                  className="
                  py-3 
                text-gray-600 
                dark:text-gray-400 
                bg-transparent 
                focus:outline-none 
                focus:border 
                focus:bg-white
                font-normal 
                w-full 
                pl-4 
                text-sm 
                border-gray-300
                dark:border-gray-700 
                rounded 
                border 
                shadow
                "
                />
              </div>
              <button type="submit" className="mt-4 sm:mt-0 sm:ml-4 focus:outline-none bg-black transition duration-150 ease-in-out hover:bg-black rounded text-white px-8 py-3 text-sm">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}