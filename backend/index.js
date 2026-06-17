require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/auth',   require('./routes/auth'));
app.use('/api/tasks',  require('./routes/tasks'));
app.use('/api/master', require('./routes/master'));
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.get('/', (_, res) => res.json({ status: 'ok', message: 'API is running ✅' }));

const PORT = process.env.PORT || 4000;
// Listen on all interfaces — needed for hosts like Render/Railway to reach it.
app.listen(PORT, () => console.log(`✅ Server ready → http://localhost:${PORT}`));
