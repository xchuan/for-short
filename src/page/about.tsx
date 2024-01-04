import { useParams } from 'react-router-dom'

export default function About(){
  const params = useParams();
  //const [search, setSearch] = useSearchParams();
  console.log(params)

  return (
    <>
      <div>
        About Us{params.nickname!==undefined ? ',Welcome ' : ''}
        {params.nickname && params.nickname}
        {params.nickname!==undefined ? '!' : "."}
      </div>
    </>
  )
}