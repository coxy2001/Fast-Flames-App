import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Directus } from '@directus/sdk';
import uuid from 'react-uuid';

const directus = new Directus(process.env.DB_HOST, { auth: { staticToken: process.env.DB_TOKEN } });

async function createNewQuestionnaireReponse(ff_uuid, questionsAnswers, id) {

  let prospect = await directus.items('prospects').readByQuery({
    search: id,
    filter: {
      uuid: {
        _eq: id,
      },
    }
  });

  await directus.items('questionnaire_responses').createOne(
    { uuid: ff_uuid, responses: questionsAnswers, prospect: prospect.data[0].id },
  );


}


export default function Form({ q }) {
  const router = useRouter()
  const { _, title, id } = router.query;

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts

    const ff_uuid = uuid();
    let questionsAnswers = []

    for (let index = 0; index < event.target.question.length; index++) {
      let answer = event.target.question[index].value
      let question = event.target.question[index].name
      let obj = { question: question, answer: answer }

      questionsAnswers.push(obj)
    }

    await createNewQuestionnaireReponse(ff_uuid, questionsAnswers, id)

    setIsLoading(false)

    router.push(`/next/thanks?id=${ff_uuid}`)

  }

  return (
    <div className='bg-slate-50'>
      <div className="bg-slate-50 px-6 mx-auto container w-full h-screen">
        <div className="grid place-items-center text-3xl">
        </div>
        <div className='flex justify-center pb-20 bg-slate-50'>
          <div className="py-12">
            <h2 className={`text-3xl font-bold ${error ? "text-red-600" : "text-black"}`}>{error ?? decodeURI(title)}</h2>

            <div className="mt-8 max-w-md">
              <p className='pb-8'>Answer this BRIEF questionnaire, book a phone call and receive your first FREE Open Flames gift!</p>
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  {q.data.questions.map((question, idx) => (
                    <FormInputField
                      key={idx}
                      question={question}
                    />
                  ))}
                </div>
                <div className='pt-10'>
                  <button type="submit" disabled={isLoading} className='text-left py-2.5 px-5 mr-2 mb-2 text-lg font-medium text-white focus:outline-none bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
                    {isLoading ? 'Loading...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FormInputField({ question }) {
  return (<label className="block">
    <span className="text-gray-700">{question.questionnaire_questions_id.question}</span>
    <input
      type="text"
      id="question"
      name={question.questionnaire_questions_id.question}
      className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
      placeholder=""
      required
    />
  </label>)
}


export async function getStaticPaths() {
  const res = await fetch(`${process.env.DB_HOST}/items/questionnaire_forms?fields=id&filter[status][_eq]=published`)
  const forms = await res.json()

  const paths = forms.data.map(form => {

    return {
      params: {
        fid: form.id.toString(),
      },
    };
  });

  return {
    fallback: 'blocking',
    paths: paths,
  }
}

export async function getStaticProps({ params }) {
  const question = await fetch(`${process.env.DB_HOST}/items/questionnaire_forms/${params.fid}?fields=*.questionnaire_questions_id.*&filter[status][_eq]=published`);
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