import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [currentValue, setCurrenteValue] = useState('0');
  const [pendingOperation, setPendingOperation] = useState(null);
  const [pendingValues, setPendingValues] = useState(null);
  const [completeOperation, setCompleteOperation] = useState('');
  const [error, setError] = useState(false);
  
  const keyPadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const operations = ['+', '-', '*', '/'];

  const handleCLick = (val) => {
    if (error) {
      setCurrenteValue(val);
      setCompleteOperation(val);
      setError(false);
    } else {
      setCurrenteValue((prevValue) => {
        if (prevValue === '0') {
          return val;
        } else {
          return prevValue + val;
        }
      });
      setCompleteOperation((prevOperation) => prevOperation + val);
    }
  };

  const handleClear = () => {
    setCurrenteValue('0');
    setPendingOperation(null);
    setPendingValues(null);
    setCompleteOperation('');
    setError(false);
  }

  const handleOperation = (operation) => {
    setCompleteOperation(currentValue + '' + operation);
    setPendingOperation(operation);
    setPendingValues(currentValue);
    setCurrenteValue('0');
    setError(false);
  }

  const handleCalculate = () => {
    if (!pendingOperation || !pendingValues) {
      return
    }

    const num1 = parseFloat(pendingValues);
    const num2 = parseFloat(currentValue);

    let result

    switch (pendingOperation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 !== 0) {
          result = num1 / num2;
        } else {
          setCurrenteValue('Error');
          setCompleteOperation('Error');
          setPendingOperation(null);
          setPendingValues(null);
          setError(true);
          return
        }
        break;
    
      default:
        break;
    }

    setCompleteOperation(
      pendingValues + '' + pendingOperation + '' + currentValue + '=' + result
    );
    setCurrenteValue(result.toString());
    setPendingOperation(null);
    setPendingValues(null);
    setError(false);
  };
  return (
    <div className="bord-calculator">
    <div className="calculator">
      <div className="complete-operation">{completeOperation}</div>
      <div className="display">{currentValue}</div>
      <div className="buttons">
        <button onClick={handleClear}>AC</button>
        {keyPadNumbers.map((num) => (
          <button key={num} onClick={() => handleCLick(num)}>{num}</button>
        ))}
        {operations.map((operation) => (
          <button key={operation} onClick={() => handleOperation(operation)}>{operation}</button>
        ))}
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
    </div>
  )
}
