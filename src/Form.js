import React, {useState} from 'react';
import Switch from 'react-input-switch';

function Form () {
    const [status, setStatus] = useState('buy');
    const [stocks, setStocks] = useState(10000);
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState(false);

    function handleStocks(e){
        e.preventDefault(); 
        if(status === 'buy') {
            const addCalc = stocks + Number(amount);
            setStocks(addCalc);
        }else {
            const minusCalc = stocks - Number(amount);
            if(minusCalc > -1) {
                setStocks(minusCalc);
            }else {
                setError(true);
            }
        }
        
    }
     return <>
    <p className="red">{error? 'Insufficient funds!' : ''}</p> 
    <form>
        <span>sell</span> <Switch on="buy" off="sell" value={status} onChange={setStatus} /> <span>buy</span><br/>
        <input type="number" id="stock" onChange={e => setAmount(e.target.value)} />
        <input type="submit" value={status} onClick={handleStocks} />
        <p>You have {stocks} stocks in account</p>
               
    </form>
    </>
};

export default Form;
