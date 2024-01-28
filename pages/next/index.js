import { Stream } from "@cloudflare/stream-react";
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Next({ q }) {

    const videoIdOrSignedUrl = "343237d7ff17df62752185f5f1fec81f";

    return (
        <div className="mx-auto container w-full bg-gray-900 h-screen">
            <div className="grid place-items-center text-3xl">
                <div className="w-full sm:w-full md:w-1/2 py-5 px-5">
                    <div className="border-4 border-white">
                        <Stream
                            controls
                            src={videoIdOrSignedUrl}
                            responsive={true}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-yellow-100 h-1" />
            <div className="md:hidden bg-slate-50 text-3xl text-center p-4">
                <p className="align-middle font-bold text-black">What’s your most burning issue?</p>
            </div>
            <div className="flex justify-center pb-20 bg-slate-50 md:pt-20 md:px-20 lg:px-40 items-center">
                <p className="hidden md:block md:text-4xl text-xl px-5 font-bold text-black">What’s your most burning issue?</p>
                <div className="p-4 grid-flow-row">
                    {q.data.map((question) => (
                        <Question
                            key={question.id}
                            question={question}
                        />
                    ))}
                </div>
            </div>
            <div className="bg-yellow-100 h-1 flex" />
        </div>
    )
}

function Question({ question }) {
    const router = useRouter()
    const url = new URL('https://quiz.markbunting.co.nz' + router.asPath);
    const id = url.searchParams.get('id')

    return (<Link href={{pathname: `next/${question.id}`, query: {title: encodeURI(JSON.stringify(question.title)), id: id}}} >
        <button
            type="button"
            className="text-left py-2.5 px-5 mr-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            {question.title}
        </button>
    </Link>)
}

export async function getStaticProps() {
    const question = await fetch(`${process.env.DB_HOST}/items/questionnaire_forms?fields=*.*.*&filter[status][_eq]=published`);
    const q = await question.json()

    return {
        props: {
            q
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every X seconds
        revalidate: 10, // In seconds
    };
}