const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Sample hardcoded issues
const issues = [
  { id: 1, title: 'Issue 1', description: 'This is issue 1.' },
  { id: 2, title: 'Issue 2', description: 'This is issue 2.' },
  { id: 3, title: 'Issue 3', description: 'This is issue 3.' },
];

// Route to list all issues
app.get('/issues', (req, res) => {
  res.json(issues);
});

// Route to create a new issue
app.post('/issues', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  const newIssue = { id: issues.length + 1, title, description };
  issues.push(newIssue);
  res.status(201).json(newIssue);
});

// Route to update an issue by ID
app.put('/issues/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  const issue = issues.find((issue) => issue.id === id);
  if (!issue) {
    return res.status(404).json({ error: 'Issue not found' });
  }
  if (title) issue.title = title;
  if (description) issue.description = description;
  res.json(issue);
});

// Route to delete an issue by ID
app.delete('/issues/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = issues.findIndex((issue) => issue.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Issue not found' });
  }
  issues.splice(index, 1);
  res.json({ message: 'Issue deleted' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
