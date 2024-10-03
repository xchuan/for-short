//import { useSearchParams ,useLocation } from 'react-router-dom';
import { useState } from "react";
import axios, { AxiosProgressEvent } from "axios";
//useSearchParams
interface locationLink {
  name: string;
  link: string;
}

export default function Uploadfile() {
  //const [search, setSearch] = useSearchParams();
  const [file, setFile] = useState<File>();

  return (
    <>
      <form action="/upload-multi" method="post" encType="multipart/form-data">
        <h2>多文件上传</h2>
        <div>
          <input type="file" name="logos" />
        </div>
        <div>
          <input type="file" name="logos" />
        </div>
        <button type="submit">上传</button>
      </form>
    </>
  );
}
