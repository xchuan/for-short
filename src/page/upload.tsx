//import { useSearchParams ,useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios, { AxiosProgressEvent } from 'axios';
//useSearchParams
interface locationLink {
  name: string;
  link: string;
}

export default function Upload() {
  //const [search, setSearch] = useSearchParams();
  const [file, setFile] = useState<File>()

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function uploadPut(url: string, file: File) {

    // 使用FormData对象上传文件
    //const formData = new FormData();
    //formData.append('file', file);
    let objSize = file.size;
    console.log(objSize, "objSize");

    /*fetch(url, {
      method: 'PUT',
      body: file
    }).then(() => {
      // If multiple files are uploaded, append upload status on the next line.
      console.log('上传成功', file.name);
    }).catch((e) => {
      console.error('上传失败', e);
    });*/

    /*axios({
      method: 'PUT',
      url,
      headers: {
        "Content-Type": "application/octet-stream",
      },
      data: new Blob([file]),
      responseType: "blob"
    }).then((res) => {
      console.log({ res })
    }).catch(console.error)*/
    //https://www.qiufeng.blue/node/upload.html#%E6%8E%A5%E6%94%B6%E7%AB%AF
    //https://stackoverflow.com/questions/57873444/converting-fetch-put-request-into-axios-request
    //https://blog.csdn.net/hzw2312/article/details/106078604

    /*const header = {
      headers: { "Content-Type": file.type },
      timeout: 3600000,
    };
    axios.put(url, file, header).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })*/
    axios({ 
      method: 'put', 
      url: url, 
      data: file,
      headers: {
        "Content-Type": file.type,
      },
      timeout: 36000000,
      onUploadProgress:(e:AxiosProgressEvent)=>{
        console.log(e,"onUploadProgress");
        
        if(e.total && e.loaded){
          console.log(Math.round(e.loaded / e.total * 100) + '%');
        }
      },
      //onUploadProgress: function(progressEvent:ProgressEvent) {
        
      //}
    })
    .then((response) => {
      console.log('上传成功', response);
    })
    .catch((error) => {
      // 失败之后做些什么
      console.error('上传失败', error);
    });
    /*const reader = new FileReader();
    reader.readAsArrayBuffer(file);  
    reader.onload = () => { 
      const arrayBuffer = Array.from(new Uint8Array(reader.result as ArrayBuffer)); // 在这里可以使用 Axios 上传 arrayBuffer }; 
      axios.put(url,{file:file}).then((response) => {
        console.log('上传成功', response.data);
      })
      .catch((error) => {
        // 失败之后做些什么
        console.error('上传失败', error);
      });
    };*/
    //axios.defaults.headers.put['Content-Type'] = 'image/jpeg';
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (file) {
      const url = `/v1/presignedUrl?name=${file.name}`;
      axios.get(url).then((response) => {
        console.log(response.data);
        let newUrl: string = response.data;
        //newUrl = newUrl.replace("http://127.0.0.1:9002","");
        uploadPut(newUrl, file);
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" id="selector" multiple onChange={handleChange}></input>
        <button>Upload</button>
        <div id="status">No uploads</div>
      </form>
    </>
  )
}