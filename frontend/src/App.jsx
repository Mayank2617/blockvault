import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [chain, setChain] = useState([]);
  const [newData, setNewData] = useState('');
  const [valid, setValid] = useState(null);

  const API = 'https://blockvault-zsln.onrender.com';

  const fetchChain = async () => {
    const res = await axios.get(`${API}/chain`);
    setChain(res.data);
  };

  const addBlock = async () => {
    if (!newData.trim()) return;
    await axios.post(`${API}/add`, { data: newData });
    setNewData('');
    fetchChain();
  };

  const checkValidity = async () => {
    const res = await axios.get(`${API}/validate`);
    setValid(res.data.valid);
  };

  useEffect(() => {
    fetchChain();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔗 BlockVault - Mini Blockchain</h1>

      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={newData}
          onChange={(e) => setNewData(e.target.value)}
          placeholder="Enter data to add block"
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button onClick={addBlock} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
          Add Block
        </button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={checkValidity} style={{ padding: '0.5rem 1rem' }}>
          Check Chain Validity
        </button>
        {valid !== null && (
          <p>
            Blockchain is: <strong>{valid ? '✅ Valid' : '❌ Invalid'}</strong>
          </p>
        )}
      </div>

      <h2 style={{ marginTop: '2rem' }}>📜 Blockchain</h2>
      <div>
        {chain.map((block, index) => (
          <div
            key={index}
            style={{
              margin: '1rem 0',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              color: '#222', // Darker text
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >

            <p><strong>Index:</strong> {block.index}</p>
            <p><strong>Timestamp:</strong> {block.timestamp}</p>
            <p><strong>Data:</strong> {block.data}</p>
            <p><strong>Hash:</strong> <code style={{ wordBreak: 'break-all' }}>{block.hash}</code></p>
            <p><strong>Prev Hash:</strong> {block.previousHash}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
