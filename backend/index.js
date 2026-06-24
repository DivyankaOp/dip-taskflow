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
app.use('/api/leaves',    require('./routes/leaves'));
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res) => {
    // Prevent the browser/CDN from caching the app shell or its script —
    // this app is updated frequently and a stale cached copy showing the
    // wrong UI (e.g. admin controls to non-admins) is worse than the
    // small perf cost of always revalidating.
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
}));

const PORT = process.env.PORT || 4000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`✅ Server ready → http://localhost:${PORT}`));
}

module.exports = app;
