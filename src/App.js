import React, { useState } from 'react';
import './App.css';
import Alert from './ShowAlert';

const App = () => {
  const [input, setInput] = useState('');
  const [storedValue, setStoredValue] = useState([]);
  const [added, setAdded] = useState([]);
  const [exist, setExist] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const setDefault = () => {
    setShowAlert(false);
    setAdded([]);
    setExist([]);
  };

  const store = e => {
    e.preventDefault();
    let newValue = input.replace(/\s/g, '').split(',');
    if (newValue) {
      newValue = [...new Set(newValue)];
      let addValue = [];
      let existValue = [];
      if (storedValue.length) {
        newValue.forEach(value => {
          const index = storedValue.findIndex(item => item === value);
          if (index === -1) {
            addValue.push(value);
          } else {
            existValue.push(value);
          }
        });
        setStoredValue(prev => {
          return [...prev, ...addValue];
        });
      } else {
        setStoredValue(newValue);
      }
      setAdded(addValue);
      setExist(existValue);
      setInput('');
    }
    openAlert();
  };

  const openAlert = () => {
    setShowAlert(true);
    setTimeout(() => setDefault(), 4000);
  };

  return (
    <div className="app">
      <h1>Task</h1>
      {showAlert && added.length > 0 && (
        <Alert items={added} isExisting={false} />
      )}
      {showAlert && exist.length > 0 && (
        <Alert items={exist} isExisting={true} />
      )}

      <form onSubmit={store}>
        <input
          className="input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Please enter the input"
        />
      </form>

      <div className="card">
        {storedValue.length > 0 &&
          storedValue.map(value => (
            <div className="item" key={value}>
              {value}
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
