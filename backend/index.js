require('dotenv').config();
const path    = require('path');
const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/auth',            require('./routes/auth'));
app.use('/api/tasks',           require('./routes/tasks'));
app.use('/api/master',          require('./routes/master'));
app.use('/api/employees',       require('./routes/employees'));
app.use('/api/sites',           require('./routes/sites'));
app.use('/api/recurring-tasks', require('./routes/recurring_tasks'));
app.use('/api/leaves',          require('./routes/leaves'));
app.use('/api/tickets',         require('./routes/tickets'));   // ← YE LINE THI HI NAHI

app.use('/api/drawings',        require('./routes/drawings'));  // ← YE ADD KARO
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));


app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
}));

const PORT = process.env.PORT || 4000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`✅ Server ready → http://localhost:${PORT}`));
}

module.exports = app;
