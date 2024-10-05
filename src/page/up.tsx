//import { useSearchParams ,useLocation } from 'react-router-dom';
import { useState } from "react";
import axios, { AxiosProgressEvent } from "axios";
import { post } from "../utils/http"
//useSearchParams
interface locationLink {
  name: string;
  link: string;
}

export default function Uploadfile() {
  //const [search, setSearch] = useSearchParams();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadFile, setFile] = useState<File>()
  const [path, setPath] = useState<string>()
  const [displayPath, setDisplayPath] = useState<string>("")
  const [displayType, setDisplayType] = useState<string>("")

  function handleChangePath(event) {
    console.log(event.target.value,"setPath");
    
    setPath(event.target.value)
  }

  function handleChange(event) {
    //setSelectedFiles(event.target.files)
    setFile(event.target.files[0])
  }

  const sendFile = (event) => {
    event.preventDefault();
    // creating a new form data
    /*const formData = new FormData();
    if (selectedFiles != null) {
      const files = Array.from(selectedFiles);

      // adding files to the form data
      [...files].forEach((file) => {
        formData.append('image', file);
      })
    }

    fetch("http://localhost:3000/v1/files", {
      method: 'POST',
      body: formData
    }).then(() => {
      // If multiple files are uploaded, append upload status on the next line.
      console.log('上传成功');
    }).catch((e) => {
      console.error('上传失败', e);
    });*/

    /*axios({ 
      method: 'post', 
      url: "http://localhost:3000/v1/files", 
      data: formData,
      timeout: 36000000,
      onUploadProgress:(e:AxiosProgressEvent)=>{
        console.log(e,"onUploadProgress");
        
        if(e.total && e.loaded){
          console.log(Math.round(e.loaded / e.total * 100) + '%');
        }
      },
    })*/

    //新建 formData 对象
    /*let config = {
      //必须
      headers: {
        "Content-Type": "multipart/form-data"
      },
      //获取上传进度, 可去掉
      onUploadProgress: function (progressEvent) {
        let complete =
          ((progressEvent.loaded / progressEvent.total) * 100) | 0
        console.log(complete + "%")
      },
    }
    axios.post('http://localhost:3000/v1/files', formData, config)
      .then((response) => {
        console.log('上传成功', response);
      })
      .catch((error) => {
        // 失败之后做些什么
        console.error('上传失败', error);
      });*/
    let formData = new FormData();
    console.log(uploadFile, "uploadFile222");
    if (uploadFile)
      formData.append("file", uploadFile);

    post("http://localhost:3000/v1/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }, onUploadProgress: function (progressEvent) {
        let complete =
          ((progressEvent.loaded / progressEvent.total) * 100) | 0
        console.log(complete + "%")
      },
    });
  }

  const upload = () => {
    //const upload = async (file: File, onUploadProgress: any) => {
    let formData = new FormData();
    console.log(uploadFile, "uploadFile222");
    if (uploadFile)
      formData.append("file", uploadFile);

    post("http://localhost:3000/v1/upfile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }, onUploadProgress: function (progressEvent) {
        let complete =
          ((progressEvent.loaded / progressEvent.total) * 100) | 0
        console.log(complete + "%")
      },
    }).then((response:any)=>{
      console.log(response);
      
      setDisplayPath(response.files ?? "blank");
      setDisplayType(response.mimetype ?? "blank");
      //mimetype
    });
  }

  const uploadTrans = () => {
    console.log(path);
    
    post("http://localhost:3000/v1/trans", {
      path: displayPath,type: displayType,
      lastName: 'Flintstone'
    });
  }

  // onSubmit={sendFile}
  return (
    <>
      <div>
        <input type="file" name="image" id="image" onChange={handleChange} multiple />
        <button onClick={upload}>Send</button>
        <input type="input" id="transpath" value={displayPath} onChange={handleChangePath}></input>
        <input type="input" id="transtype" value={displayType} onChange={e => { setDisplayType(e.target.value); }}></input>
        <button onClick={uploadTrans}>Trans</button>
        <p>{displayPath} | {displayType}</p>
      </div>
    </>
  );
}
