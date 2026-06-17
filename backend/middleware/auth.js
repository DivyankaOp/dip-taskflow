const jwt = require('jsonwebtoken');

// Verifies the Bearer token sent by the frontend and attaches the decoded
// user { id, username, full_name, role } onto req.user.
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Please log in to continue' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Session expired, please log in again' });
  }
}

// Use after requireAuth on routes that only the admin should reach.
function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Only an admin can do this' });
  }
  next();
}

module.exports = { requireAuth, requireAdmin };
