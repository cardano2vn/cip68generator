"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createCollection({
  name,
  description,
}: {
  name: string;
  description?: string;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.collection.create({
      data: {
        name,
        description,
        userId,
      },
    });

    return {
      result: true,
      message: "success",
    };
  } catch (e: unknown) {
    return {
      result: false,
      message:
        e instanceof Error ? e.message : "Cant create collection,unknown error",
    };
  }
}
export async function getAllCollection() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const collections = await prisma.collection.findMany({
      where: {
        userId: userId,
      },
    });

    return {
      result: true,
      message: "success",
      data: collections,
    };
  } catch (error: unknown) {
    return {
      result: false,
      data: [],
      message:
        error instanceof Error
          ? error.message
          : "Cant get collection ,Unknown error",
    };
  }
}
