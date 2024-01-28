import Link from 'next/link'
import { useContext } from 'react';
import ClickContext from '../../contexts/click';
import ProgressBar from "@ramonak/react-progress-bar";

export default function Questions({ q, c }) {

  const maxPage = c;
  var completed = q.data.sort_order * 10;
  var maxCompleted = (maxPage * 10) + 5;

  const [
    incrWhite,
    incrRed,
    incrBlue,
    incrOrange,
  ] = useContext(ClickContext);

  return (
    <div className="container mx-auto w-100 lg:w-1/2 bg-gray-50 min-h-screen pb-24">
      <div className="pb-2">
        <div className="bg-black py-10 px-6">
          <div className="flex flex-col justify-center items-center">
            <div className="md:text-5xl text-2xl text-center text-white leading-snug lg:w-3/4">
              <h2>{q.data.question}</h2>
            </div>
          </div>
        </div>
        <ProgressBar
          completed={completed}
          borderRadius={'0'}
          bgColor={'#66CC00'}
          isLabelVisible={false}
          maxCompleted={maxCompleted}
        />
      </div>
      {q.data.answers.map(answer => (
        <Answer
          key={answer.id}
          answer={answer}
          wi={incrWhite}
          ri={incrRed}
          bi={incrBlue}
          oi={incrOrange}
          maxPage={maxPage}
          sortOrder={q.data.sort_order}
        />
      ))}
    </div>
  )
}

function Answer({ answer, wi, ri, bi, oi, maxPage, sortOrder }) {

  var increment; // The answer type (clear, red, blue, orange).
  var nextPage = ''; // What page to link to next.


  switch (answer.answers_id.type) {
    case 'Clear':
      // Originally called White.
      increment = wi
      break;
    case 'Red':
      increment = ri
      break;
    case 'Blue':
      increment = bi
      break;
    case 'Orange':
      increment = oi
      break;
  }


  if (sortOrder < maxPage + 1) {
    nextPage = sortOrder += 1
  }

  if (sortOrder >= maxPage + 1) {
    nextPage = '/result'
  }

  return (<Link href={nextPage.toString().includes('result') ? nextPage : nextPage.toString()}>
    <div className="py-2 bg-gray-50" onClick={increment}>
      <div className="container mx-auto w-11/12 rounded shadow bg-white">
        <h2 className="text-center align-middle py-8 px-2">{answer.answers_id.answer}</h2>
      </div>
    </div>
  </Link>)
}



export async function getStaticPaths() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/items/questions?fields=id&filter[status][_eq]=published`)
  const questions = await res.json()
  
  const paths = questions.data.map(question => {
    return {
      params: {
        qid: question.id.toString(),
      },
    };
  });

  return {
    fallback: 'blocking',
    paths: paths,
  }
}

export async function getStaticProps({ params }) {
  const question = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/items/questions/${params.qid}?fields=*,answers.*.*&filter[status][_eq]=published`);
  const q = await question.json()

  const meta = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/items/questions?fields=id&filter[status][_eq]=published&meta=filter_count`);
  const m = await meta.json()

  const c = m.meta.filter_count


  return {
    props: {
      q,
      c
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every X seconds
    revalidate: 10, // In seconds
  };
}