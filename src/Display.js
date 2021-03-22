import React, {useState, useEffect} from 'react';
const host = 'api.frankfurter.app';

const date30Ago = new Date(Date.now() - 30*24*60*60*1000);
const date30AgoString = date30Ago.getFullYear() + '-' + (date30Ago.getMonth() < 10 ? '0' : '') + (date30Ago.getMonth() + 1) + '-' + date30Ago.getDate()+'..';

function calcMedian(arr) {
    const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function Display() {
    const [rate, setRate] = useState(0);
    const [median, setMedian] = useState(0);
    
    useEffect(()=>{
        fetch(`https://${host}/latest?amount=10&from=CAD&to=USD`)
        .then(resp => resp.json())
        .then((data) => {
         setRate(data.rates.USD);
        });       
    },[])

    useEffect(()=>{
        fetch(`https://${host}/${date30AgoString}?amount=10&from=CAD&to=USD`)
        .then(resp => resp.json())
        .then((data) => {
         let result = []
         for(var j in data.rates) {
            result.push(data.rates[j].USD);
         }
         const med = calcMedian(result);
         setMedian(med);
        });
    },[]);

    let text = "";
   
    if(rate === median) { 
        text =  "hold";
    } else if(rate > median) { 
        text =  "buy";
    } else {
        text =  "sell";
    }

    return <>
        <p>TODAY rate for 10 dollars CAD to buy {rate} USD</p>

        <p>Median rate for last 30 days is {median}</p>
        <p>Today is good for {text}</p>
    </>
}

export default Display;