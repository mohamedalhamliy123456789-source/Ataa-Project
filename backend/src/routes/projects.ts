import { Router, Request, Response } from 'express';
import prisma from '../db';

const router = Router();

// Get all projects
router.get('/', async (req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { created_at: 'desc' }
        });
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Get a single project
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                donations: true,
                reports: true
            }
        });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch project details' });
    }
});

// Admin: Create a new project (Note: missing auth middleware for brevity, will add if needed)
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, description, target_amount, image_url, created_by } = req.body;

        if (!title || !description || !target_amount || !created_by) {
            return res.status(400).json({ error: 'Missing required project fields' });
        }

        const project = await prisma.project.create({
            data: {
                title,
                description,
                target_amount,
                image_url,
                created_by
            }
        });

        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

export default router;
