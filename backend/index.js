require('dotenv').config();
const path    = require('path');
const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// API routes
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/tasks',     require('./routes/tasks'));
app.use('/api/master',    require('./routes/master'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/sites',     require('./routes/sites'));
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

// Serve the frontend (index.html, style.css, app.js) straight from Express.
// This makes the function the single source of truth for routing — we are
// no longer relying on Vercel's vercel.json static-build matching, which is
// what was causing "/" to fall through and return the JSON health message
// instead of the actual login page.
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4000;

// Only start a listening server when running locally (e.g. `npm run dev`).
// On Vercel, the platform itself invokes the exported app per-request —
// calling app.listen() there causes the function to crash.
if (require.main === module) {
  app.listen(PORT, () => console.log(`✅ Server ready → http://localhost:${PORT}`));
}

module.exports = app;
