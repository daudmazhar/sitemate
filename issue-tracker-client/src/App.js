import React, { useState } from 'react';
import './App.css';
import Issue from './components/Issue';

const BASE_URL = 'http://localhost:3000';

function App() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchIssues = async () => {
    try {
      const response = await fetch(`${BASE_URL}/issues`);
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const createIssue = async () => {
    try {
      const response = await fetch(`${BASE_URL}/issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      const newIssue = await response.json();
      setIssues([...issues, newIssue]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  const deleteIssue = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/issues/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.message === 'Issue deleted') {
        const updatedIssues = issues.filter((issue) => issue.id !== id);
        setIssues(updatedIssues);
      }
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  const updateIssue = (id, title, description) => {
    const updatedIssues = issues.map((issue) =>
      issue.id === id ? { ...issue, title, description } : issue
    );
    setIssues(updatedIssues);
  };

  return (
    <div className="App">
      <h1> Issue Tracker</h1>
      <div>
        <h2>Create a New Issue</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className='button' onClick={createIssue}>Create Issue</button>
      </div>
      <h2>Current Issues</h2>
      {issues.length === 0 ? <button className='button' onClick={fetchIssues}>Get Current Issues</button> :
        <div>
          {issues.map((issue) => (
            <Issue 
              key={issue.id} 
              issue={issue} 
              updateIssue={(issueId, title, description) => updateIssue(issueId, title, description)} 
              deleteIssue={(issueId) => deleteIssue(issueId)} onUpdate={updateIssue}
            />    
          ))}
        </div>}
    </div>
  );
}

export default App;
