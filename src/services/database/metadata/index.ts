"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { UnauthorizedException } from "@/utils/http/http-exceptions";
import { AssetMetadata } from "@meshsdk/core";
import { Metadata } from "@prisma/client";
import { isEmpty, isNil } from "lodash";
import { DateRange } from "react-day-picker";

export async function addMetadata({
  collectionId,
  listMetadata,
}: {
  collectionId: string;
  listMetadata: AssetMetadata[];
}) {
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
        content: metadata,
      })),
    });

    return {
      result: true,
      message: "success",
    };
  } catch (e: unknown) {
    return {
      result: false,
      message:
        e instanceof Error ? e.message : "Cant create metadata,unknown error",
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
            content: {
              path: string[];
              string_contains: string;
              mode: "insensitive";
            };
          }
        | {
            content: {
              path: string[];
              string_contains: string;
              mode: "insensitive";
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
          content: {
            path: ["name"],
            string_contains: query,
            mode: "insensitive",
          },
        },
        {
          content: {
            path: ["description"],
            string_contains: query,
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
    });

    const totalItems = await prisma.metadata.count({
      where: whereConditions,
    });

    return {
      data: metadata,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  } catch (e) {
    return {
      data: [],
      message: e instanceof Error ? e.message : "unknown error",
    };
  }
}

export async function deleteMetadata({
  collectionId,
  listMetadata,
}: {
  collectionId: string;
  listMetadata: Metadata[];
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
      message: e instanceof Error ? e.message : "unknown error",
    };
  }
}
