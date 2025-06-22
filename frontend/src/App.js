import React, { useState } from 'react';
import './App.css'; // Import our custom CSS

function App() {
  const [hash, setHash] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/crack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hash: hash })
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      setResult('Error connecting to server.');
    }
  };

  return (
    <div className="container">
      <h1>🔐 SHA-256 Hash Cracker</h1>

      <input
        className="input-box"
        type="text"
        placeholder="Enter SHA-256 Hash"
        value={hash}
        onChange={(e) => setHash(e.target.value)}
      />

      <button className="crack-button" onClick={handleSubmit}>
        Crack Hash
      </button>

      <div className="result">
        <strong>Result found :<br></br></strong> {result}
      </div>
    </div>
  );
}

export default App;
