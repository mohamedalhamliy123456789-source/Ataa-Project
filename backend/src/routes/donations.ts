import { Router, Request, Response } from 'express';
import prisma from '../db';
import jwt from 'jsonwebtoken';

const router = Router();

// Middleware to check authentication (simplified)
const authMiddleware = (req: Request, res: Response, next: Function) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret_fallback_key') as { userId: string, role: string };
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Create a new donation (simulated payment)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { project_id, amount } = req.body;
        const userId = (req as any).user.userId;

        if (!project_id || !amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid donation details' });
        }

        const project = await prisma.project.findUnique({ where: { id: project_id } });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // 1. Create the donation record with SIMULATED_SUCCESS status
        const donation = await prisma.donation.create({
            data: {
                user_id: userId,
                project_id,
                amount,
                status: 'SIMULATED_SUCCESS'
            }
        });

        // 2. Update the project's current_amount
        await prisma.project.update({
            where: { id: project_id },
            data: {
                current_amount: project.current_amount + amount
            }
        });

        res.status(201).json({ message: 'Donation successful', donation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process donation' });
    }
});

// Get user's donation history (Transparency)
router.get('/history', authMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const donations = await prisma.donation.findMany({
            where: { user_id: userId },
            include: { project: true },
            orderBy: { created_at: 'desc' }
        });
        res.json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

export default router;
