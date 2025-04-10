"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PMetadata } from "@/types";
import { parseError } from "@/utils/error/parse-error";
import { UnauthorizedException } from "@/utils/http/http-exceptions";
import { isEmpty, isNil } from "lodash";
import { DateRange } from "react-day-picker";

export async function addMetadata({ collectionId, listMetadata }: { collectionId: string; listMetadata: Record<string, string>[] }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (isNil(userId)) {
      throw new UnauthorizedException();
    }

    const collection = await prisma.collection.findFirst({
      where: {
        id: collectionId,
        userId: userId,
      },
    });

    if (isNil(collection)) {
      throw new Error("Collection not found");
    }

    await prisma.metadata.createMany({
      data: listMetadata.map((metadata) => ({
        collectionId,
        content: JSON.stringify(metadata),
      })),
    });

    return {
      result: true,
      message: "success",
    };
  } catch (e) {
    return {
      result: false,
      message: parseError(e),
    };
  }
}

export async function getMetadata({
  collectionId,
  query = null,
  range = null,
  page = 1,
  limit = 12,
}: {
  collectionId: string;
  query?: string | null;
  range?: DateRange | null;
  page?: number;
  limit?: number;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const collection = await prisma.collection.findFirst({
      where: {
        id: collectionId,
        userId: userId,
      },
    });

    if (isNil(collection)) {
      throw new Error("Collection not found");
    }

    const whereConditions: {
      collectionId: string;
      OR?: Array<
        | {
            assetName?: {
              contains: string;
              mode?: "insensitive";
            };
          }
        | {
            content?: {
              contains: string;
              mode?: "insensitive";
            };
          }
      >;
      createdAt?: {
        gte?: Date;
        lte?: Date;
      };
    } = {
      collectionId,
    };

    if (!isNil(query) && !isEmpty(query)) {
      whereConditions.OR = [
        {
          assetName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: query,
            mode: "insensitive",
          },
        },
      ];
    }

    if (!isNil(range)) {
      whereConditions.createdAt = {
        gte: range.from,
        lte: range.to,
      };
    }

    const metadata = await prisma.metadata.findMany({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        updatedAt: "desc",
      },
    });

    const totalItems = await prisma.metadata.count({
      where: whereConditions,
    });

    const parsedMetadata: PMetadata[] = metadata.map((item) => ({
      ...item,
      content: JSON.parse(item.content),
    }));
    return {
      data: parsedMetadata,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  } catch (e) {
    return {
      data: [],
      message: parseError(e),
    };
  }
}

export async function getMetadataById({ metadataId }: { metadataId: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const metadata = await prisma.metadata.findFirst({
      where: {
        id: metadataId,
      },
    });
    const parsedMetadata: PMetadata = metadata ? { ...metadata, content: JSON.parse(metadata.content) } : null!;

    const collection = await prisma.collection.findFirst({
      where: {
        id: metadata?.collectionId,
        userId: userId,
      },
    });

    if (isNil(collection)) {
      throw new Error("Metadata not found");
    }

    return {
      data: parsedMetadata,
      message: "success",
    };
  } catch (e) {
    return {
      data: null,
      message: parseError(e),
    };
  }
}

export async function deleteMetadata({ collectionId, listMetadata }: { collectionId: string; listMetadata: PMetadata[] }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const collection = await prisma.collection.findFirst({
      where: {
        id: collectionId,
        userId: userId,
      },
    });

    if (isNil(collection)) {
      throw new Error("Collection not found");
    }

    const metadataIds = listMetadata.map((metadata) => metadata.id);

    await prisma.metadata.deleteMany({
      where: {
        id: {
          in: metadataIds,
        },
      },
    });

    return {
      result: true,
      message: "success",
    };
  } catch (e) {
    return {
      result: false,
      message: parseError(e),
    };
  }
}

export async function updateMetadata({ collectionId, metadata }: { collectionId: string; metadata: PMetadata }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const collection = await prisma.collection.findFirst({
      where: {
        id: collectionId,
        userId: userId,
      },
    });

    if (isNil(collection)) {
      throw new Error("Collection not found");
    }

    await prisma.metadata.update({
      where: {
        id: metadata.id,
      },
      data: {
        content: JSON.stringify(metadata.content),
      },
    });

    return {
      result: true,
      message: "success",
    };
  } catch (e) {
    return {
      result: false,
      message: parseError(e),
    };
  }
}
