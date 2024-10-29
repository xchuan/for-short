import { useState, useEffect, useRef } from "react";
import { IMonth } from "../../utils/file";
import moment from "moment";

interface monthProps {
  title?:string;
}

export default function Months(props:monthProps) {
  const diffs: IMonth[] = [];

  const [monthdiff, setMonthdiff] = useState<IMonth[]>([]);

  const hereNow = moment().format("YYYY-MM-DD");
  const misuMin = moment().add(22, 'w').format("YYYY-MM-DD");
  const misuMax = moment().add(25, 'w').format("YYYY-MM-DD");

  const diffMonth = moment(misuMin).diff(moment(), 'month');
  const diffDays = moment(misuMin).diff(moment(), 'days');

  useEffect(() => {
    const nowM = moment().month();
    console.log((nowM+1)%4,"nowMnowMnowM")
    const nowY = moment().year();
    const newDiff: IMonth[] = [];
    const prevBlank = (nowM+1)%4;
    if(prevBlank>0){
      for (let index = prevBlank; index > 0; index--) {
        newDiff.push({
          year: nowY.toString(),
          month: moment().add(-index+1, 'month').month()+1,
          cls:'blank'
        })
      }
    }
    
    for (let index = 1; index < diffMonth+1; index++) {
      newDiff.push({
        year: moment().add(index, 'month').format("YYYY"),
        month: moment().add(index, 'month').month()+1,
      })
    }
    console.log(newDiff, 'newDiff')
    setMonthdiff(newDiff);
  }, []);

  return (
    <>
      <div>
        {props.title}
        <ul className="counter_month">
          {monthdiff.map((item, index) => (
            <li className={item.cls} key={index} title={item.year+"_"+item.month}></li>
          ))}
        </ul>
        从{hereNow}开始至{misuMin}~{misuMax}，共{diffDays}天，约{diffMonth}个月
      </div>
    </>
  );
}
