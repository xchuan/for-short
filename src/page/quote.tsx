import { useState } from "react";
import { post, get } from "../utils/http";
export default function Quote() {
  const [quoteCn, setQuoteCn] = useState<string>("");
  const [quoteEn, setQuoteEn] = useState<string>("");
  const [quoteAuthor, setQuoteAuthor] = useState<string>("");
  const [quoteJson, setQuoteJson] = useState<string>("");
  const [quoteLen, setQuoteLen] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState('Shanghai');

  function handleChangeQuote(event) {
    const inputCn = event.target.value;
    if(inputCn.includes(" -")){
      const cutCn = inputCn.split(' -');
      setQuoteCn(cutCn[0]);
      setQuoteAuthor(cutCn[1]);
    }else{
      setQuoteCn(event.target.value);
    }
    
  }

  function handleChangeAuthor(event) {
    setQuoteAuthor(event.target.value);
  }

  function handleChangeEng(event) {
    setQuoteEn(event.target.value);
  }
  const previewJson = () => {
    const myRequest = new Request("https://quotes.xhashao.top/quotes1.json");//Github
    setQuoteJson('Loading...');
    fetch(myRequest)
      .then((response) => response.json())
      .then((quotes) => {
        console.log(quotes);
        setQuoteJson(JSON.stringify(quotes.data));
        setQuoteLen(quotes.data.length);
      });
  };

  const previewJsonCdn = () => {
    const myRequest1 = new Request("https://cdn.xhashao.top/nchome/quotes.json");
    //const myRequest = new Request("https://cdn.xhashao.top/nchome/quotes1.json");//Minio
    setQuoteJson('Loading...');
    fetch(myRequest1)
      .then((response) => response.json())
      .then((quotes) => {
        setQuoteJson(JSON.stringify(quotes.data));
        setQuoteLen(quotes.data.length);
      });
  };

  const syncJson = () => {

  }

  const createQuote = () => {
    post("/v1/quotes", {
      quote: quoteCn,
      author: quoteAuthor,
      english: quoteEn,
      city: selectedCity
    }).then((response:any)=>{
      console.log(response);
    }).catch((error:any) => {
      console.log(error,"Create error")
    });
  }

  const goTranslate =() => {
    post("/v1/translate", {
      quote: quoteCn,
    }).then((response:any)=>{
      console.log(response);
      setQuoteEn(response['translated']);
    }).catch((error:any) => {
      console.log(error,"Translate error")
    });
  }

  const uploadQuote =() => {
    get("/v1/jsonupload").then((response:any)=>{
      console.log(response);
      setQuoteEn(response['translated']);
    }).catch((error:any) => {
      console.log(error,"Upload error")
    });
  }

  return (
    <div style={{
      marginLeft: "20px",
    }}>
      <h3>名言</h3>
      <div >
        <textarea
          style={{
            width: "50%",
            height: "150px",
            display: "block",
          }}
          defaultValue={quoteJson}
        ></textarea>
        <div>{quoteLen}条数据</div>
        <button onClick={previewJson}>Git</button>
        <button onClick={previewJsonCdn}>CDN</button>
        <button onClick={syncJson}>同步</button>
      </div>
      <div>
        Write quotes:
        <input
          type="input"
          value={quoteCn}
          onChange={handleChangeQuote}
          style={{
            width: "50%",
            height: "40px",
            lineHeight: "40px",
            fontSize: "18px",
            display: "block",
          }}
        ></input>
        <input
          type="input"
          value={quoteAuthor}
          onChange={handleChangeAuthor}
          placeholder="Author"
          style={{
            width: "15%",
            height: "40px",
            lineHeight: "40px",
            fontSize: "18px",
            display: "inline-block",
          }}
        ></input>
        <select
          style={{marginLeft: "10px",lineHeight: "46px",height: "46px",verticalAlign: "1px",width: "80px",display: "inline-block"}}
          value={selectedCity} 
          onChange={e => setSelectedCity(e.target.value)}
         >
          <option value="Shanghai">上海</option>
          <option value="New York">纽约</option>
          <option value="London">伦敦</option>
          <option value="Paris">巴黎</option>
          <option value="Beijing">北京</option>
          <option value="Taipei">台北</option>
          <option value="Berlin">柏林</option>
        </select>
        <input
          type="input"
          value={quoteEn}
          onChange={handleChangeEng}
          placeholder="English"
          style={{
            width: "90%",
            height: "25px",
            lineHeight: "25px",
            fontSize: "14px",
            display: "block",
          }}
        ></input>
        <button onClick={createQuote}>增加</button> <button onClick={goTranslate}>翻译</button> <button onClick={uploadQuote}>上传</button>
      </div>
    </div>
  );
}
