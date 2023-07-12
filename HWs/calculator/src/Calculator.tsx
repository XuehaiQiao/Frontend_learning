import React, { useEffect, useState } from 'react'
import './Calculator.css';


function Calculator() {
    const [display, setDisplay] = useState('');
    const [storedNum, setStoredNum] = useState(0);
    const [storedOp, setStoredOp] = useState('');

    const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    useEffect(() => {
        console.log(storedNum, storedOp, display);
    }, [display, storedNum, storedOp])

    const handleAc = () => {
        if(display !== '') setDisplay('');
        else {
            setStoredNum(0);
            setStoredOp('');
        }
    }

    const handleNumber = (num: number) => {
        if(display.length >= 10) return;
        else if(display === '') setDisplay(num.toString()); 
        else setDisplay((prev) => prev + num.toString()); 
    }

    const handleDot = () => {
        if(display.includes('.')) return;
        else if(display === '') setDisplay('0.');
        else setDisplay((prev) => prev + '.'); 
    }

    const handleSignChange = () => {
        setDisplay(prev => (Number.parseFloat(prev) * -1).toString());
    }

    const handlePercent = () => {
        setDisplay(prev => {
            let cur = (Number.parseFloat(prev) / 100).toFixed(10).toString();
            console.log(cur)
            return trimDisplay(cur);
        });
    }

    const handleOperation = (op: string) => {
        if(storedOp === '') {
            setStoredNum(Number.parseFloat(display)); 
        }
        else {
            let result = calculate();
            setStoredNum(result);
        }

        setDisplay('');
        setStoredOp(op);
    }

    const calculate = (): number => {
        switch(storedOp) {
            case '+': return storedNum + Number.parseFloat(display);
            case '-': return storedNum - Number.parseFloat(display);
            case '*': return storedNum * Number.parseFloat(display);
            case '/': return storedNum / Number.parseFloat(display);
        }
        return 0;
    }

    const handleEqual = () => {
        let result = calculate();
        setDisplay(trimDisplay(result.toString()));
        setStoredOp('');
        setStoredNum(0);
    }

    const trimDisplay = (cur: string) => {
        if(!cur.includes('.')) return cur;

        for(var i = cur.length - 1; i >= 0; i--) {
            if(cur[i] === '.') return cur.substring(0, i);
            else if(cur[i] !== '0') {
                return cur.substring(0, i + 1);
            }
        }

        return '0';
    }
    

    return (
        <div className='calculator'>
            <div className='display'>{display === '' ? trimDisplay(storedNum.toFixed(10).toString()): display}</div>
            {numbers.map(num => {
                if(num === 0) return <div className='button number' id='zero' key={num} onClick={() => handleNumber(num)}>{num}</div>
                return <div className='button number' key={num} onClick={() => handleNumber(num)}>{num}</div>
            })}
            <div className='button number' onClick={handleDot}>.</div>

            <div className='button top-left' id='ac' onClick={handleAc}>{display === '' ? 'AC' : 'C'}</div>
            <div className='button top-left' id='sign' onClick={handleSignChange}>+/-</div>
            <div className='button top-left' id='percent' onClick={handlePercent}>%</div>

            <div className='button operation' id='divid' onClick={() => handleOperation('/')}>/</div>
            <div className='button operation' id='multi' onClick={() => handleOperation('*')}>X</div>
            <div className='button operation' id='minus' onClick={() => handleOperation('-')}>-</div>
            <div className='button operation' id='plus' onClick={() => handleOperation('+')}>+</div>
            <div className='button operation' id='equal' onClick={handleEqual}>=</div>
        </div>
    )
}

export default Calculator