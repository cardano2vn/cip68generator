"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AssetInput } from "@/types";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createCollection({ name, description }: { name: string; description?: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.collection.create({ data: { name, description, userId } });

    return { result: true, message: "Your collection folder has been created successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function getAllCollection() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const collections = await prisma.collection.findMany({ where: { userId: userId }, orderBy: { createdAt: "desc" } });

    return { result: true, message: "Get all collection successfull", data: collections };
  } catch (e) {
    return { result: false, data: [], message: parseError(e) };
  }
}

export async function deleteCollection(collectionId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.collection.delete({ where: { id: collectionId } });

    return { result: true, message: "Your collection folder has been created successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function updateCollection({ collectionId, name, description }: { collectionId: string; name: string; description?: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.collection.update({ where: { id: collectionId }, data: { name, description } });

    return { result: true, message: "Your collection folder has been created successfully!" };
  } catch (e) {
    return { result: false, message: parseError(e) };
  }
}

export async function createCollectionWithData({ collectionName, listAssetInput }: { collectionName: string; listAssetInput: AssetInput[] }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const result = await prisma.collection.create({
      data: {
        name: collectionName,
        userId: userId,
        Metadata: {
          create: listAssetInput.map((asset) => ({ assetName: asset.assetName, content: JSON.stringify(asset.metadata), nftReference: [] })),
        },
      },
      include: { Metadata: true },
    });

    return { result: true, message: "success", data: result };
  } catch (e) {
    return { data: null, result: false, message: parseError(e) };
  }
}
