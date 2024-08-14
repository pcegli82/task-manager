const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Task = require('./models/Task');

const app = express();
app.use(cors());
app.use(express.json());

// Test the database connection
sequelize.sync().then(() => {
  console.log('Database synced successfully.');
}).catch(err => {
  console.error('Error syncing the database:', err);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single task by ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task by ID
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.destroy();
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
