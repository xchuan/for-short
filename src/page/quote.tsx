import { useState } from "react";

export default function Quote() {
  const [quoteCn, setQuoteCn] = useState<string>("");
  const [quoteJson, setQuoteJson] = useState<string>("");
  const [quoteLen, setQuoteLen] = useState<number>(0);
  function handleChangeQuote(event) {
    setQuoteCn(event.target.value);
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
    const myRequest = new Request("https://cdn.xhashao.top/nchome/quotes1.json");//Minio
    setQuoteJson('Loading...');
    fetch(myRequest)
      .then((response) => response.json())
      .then((quotes) => {
        setQuoteJson(JSON.stringify(quotes.data));
        setQuoteLen(quotes.data.length);
      });
  };

  const syncJson = () => {

  }

  const createQuote = () => {

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
        <button onClick={createQuote}>增加</button>
      </div>
    </div>
  );
}
