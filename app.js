const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Подключение к MongoDB
mongoose.connect('mongodb://localhost/tableApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Определение схемы таблицы
const tableSchema = new mongoose.Schema({
  name: String,
  comment: String,
  data: [[String]]
});

const Table = mongoose.model('Table', tableSchema);

app.use(bodyParser.json());
app.use(express.static('public'));

// API для получения всех таблиц
app.get('/api/tables', async (req, res) => {
  const tables = await Table.find();
  res.json(tables);
});

// API для добавления новой таблицы
app.post('/api/tables', async (req, res) => {
  const newTable = new Table(req.body);
  await newTable.save();
  res.json(newTable);
});

// API для обновления таблицы
app.put('/api/tables/:id', async (req, res) => {
  const updatedTable = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTable);
});

// API для удаления таблицы
app.delete('/api/tables/:id', async (req, res) => {
  await Table.findByIdAndDelete(req.params.id);
  res.json({ message: 'Table deleted' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
