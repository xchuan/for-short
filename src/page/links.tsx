import { useSearchParams ,useLocation } from 'react-router-dom'
//useSearchParams
interface locationLink {
  name:string;
  link:string;
}

export default function Links(){
  const [search, setSearch] = useSearchParams();
  const link_name = search.get('name');
  const link_href = search.get('link');
  const locationp = useLocation();
  return (
    <>
      {!locationp.state ? 
      <div>Links {(link_href && link_name) ? <a href={link_href} target="_blank">{link_name}</a> : ''}</div>  : ''}
      {locationp.state ? 
      <div>Link from state <a href={locationp.state?.link} target="_blank">{locationp.state?.name}</a></div> : ''}
    </>
  )
}