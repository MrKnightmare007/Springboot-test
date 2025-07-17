import React, { useState, useEffect } from 'react';

function App() {
  const [internships, setInternships] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = () => {
    fetch('http://localhost:8080/internships')
      .then(res => res.json())
      .then(data => setInternships(data));
  };

  const addInternship = () => {
    fetch('http://localhost:8080/internships', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, duration: '3 months', status: 'Open' })
    }).then(fetchInternships);
    setNewTitle(''); // Clear input after add
  };

  const updateInternship = (id) => {
    fetch(`http://localhost:8080/internships/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Updated Title', duration: '5 months', status: 'Closed' })
    }).then(fetchInternships);
  };

  const patchInternship = (id) => {
    fetch(`http://localhost:8080/internships/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Pending' })
    }).then(fetchInternships);
  };

  const deleteInternship = (id) => {
    fetch(`http://localhost:8080/internships/${id}`, { method: 'DELETE' })
      .then(fetchInternships);
  };

  return (
    <div>
      <h1>Internships Table</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Duration</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {internships.map(i => (
            <tr key={i.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{i.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{i.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{i.duration}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{i.status}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => updateInternship(i.id)}>Update</button>
                <button onClick={() => patchInternship(i.id)}>Patch Status</button>
                <button onClick={() => deleteInternship(i.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px' }}>
        <input 
          value={newTitle} 
          onChange={e => setNewTitle(e.target.value)} 
          placeholder="New Internship Title" 
        />
        <button onClick={addInternship}>Add Internship</button>
      </div>
    </div>
  );
}

export default App;
