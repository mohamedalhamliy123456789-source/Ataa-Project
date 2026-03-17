import prisma from '../src/db';

async function main() {
    console.log('Starting seed...');

    const admin = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
    });

    let creatorId = admin?.id;

    if (!creatorId) {
        console.log('No admin found, creating a default system admin...');
        const newAdmin = await prisma.user.create({
            data: {
                name: 'System Admin',
                email: 'admin@system.local',
                password_hash: 'system_hash', // Dummy hash
                role: 'ADMIN'
            }
        });
        creatorId = newAdmin.id;
    }

    // List of standard projects
    const projects = [
        {
            title: 'صندوق التبرعات العامة',
            description: 'يستقبل الصندوق التبرعات العامة وتوجيهها للمشاريع الأكثر احتياجاً.',
            target_amount: 1000000,
            status: 'ACTIVE' as const,
            created_by: creatorId
        },
        {
            title: 'صدقة جارية',
            description: 'مشاريع مستدامة يعود نفعها وأجرها على المدى الطويل.',
            target_amount: 500000,
            status: 'ACTIVE' as const,
            created_by: creatorId
        },
        {
            title: 'إغاثة عاجلة لمتضرري السيول',
            description: 'توفير المأوى والغذاء والإسعافات الأولية للمتضررين.',
            target_amount: 2500000,
            status: 'ACTIVE' as const,
            created_by: creatorId
        }
    ];

    for (const p of projects) {
        const existing = await prisma.project.findFirst({ where: { title: p.title } });
        if (!existing) {
            await prisma.project.create({ data: p });
            console.log(`Created project: ${p.title}`);
        } else {
            console.log(`Project already exists: ${p.title}`);
        }
    }

    console.log('Seeding completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
