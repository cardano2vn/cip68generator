import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { UnauthorizedException } from '@/utils/http/http-exceptions';

export async function getMedia() {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        throw new UnauthorizedException();
    }
    const media = await prisma.media.findMany({
        where: {
            userId: userId,
        },
    });
    console.log('media', media);
    return media;
}
