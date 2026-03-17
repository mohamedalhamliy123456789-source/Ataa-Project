import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import donationRoutes from './routes/donations';
import adminRoutes from './routes/admin';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/admin', adminRoutes);

// Serve static files from the frontend export
// __dirname at runtime is /backend/dist, so we need 3 levels up to reach the project root
const frontendPath = path.join(__dirname, '..', '..', '..', 'frontend', 'dist_web');
app.use(express.static(frontendPath));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Debug route to check paths at runtime
app.get('/debug-path', (req: Request, res: Response) => {
  const fs = require('fs');
  const files = fs.existsSync(frontendPath) ? fs.readdirSync(frontendPath) : ['NOT FOUND'];
  res.json({ __dirname, frontendPath, files });
});

// Wildcard route to serve index.html for any non-API routes
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`[server]: Server is running on port ${port}`);
});
