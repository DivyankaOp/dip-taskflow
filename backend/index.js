require('dotenv').config();
const path    = require('path');
const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/auth',      require('./routes/auth'));
app.use('/api/tasks',     require('./routes/tasks'));
app.use('/api/master',    require('./routes/master'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/sites',     require('./routes/sites'));
app.use('/api/recurring-tasks', require('./routes/recurring_tasks'));
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`✅ Server ready → http://localhost:${PORT}`));
}

module.exports = app;
