import { Router, Request, Response } from 'express';
import prisma from '../db';
import jwt from 'jsonwebtoken';

const router = Router();

// Middleware to check admin role
const adminMiddleware = (req: Request, res: Response, next: Function) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret_fallback_key') as { userId: string, role: string };
        if (decoded.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Forbidden: Admin access required' });
        }
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Admin: Publish a Transparency Report
router.post('/reports', adminMiddleware, async (req: Request, res: Response) => {
    try {
        const { project_id, content } = req.body;

        if (!project_id || !content) {
            return res.status(400).json({ error: 'Missing report details' });
        }

        const report = await prisma.transparencyReport.create({
            data: {
                project_id,
                content
            }
        });

        res.status(201).json({ message: 'Report published successfully', report });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to publish report' });
    }
});

// Admin: Get all reports
router.get('/reports', adminMiddleware, async (req: Request, res: Response) => {
    try {
        const reports = await prisma.transparencyReport.findMany({
            include: { project: true },
            orderBy: { published_at: 'desc' }
        });
        res.json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
});

export default router;
