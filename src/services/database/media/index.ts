"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { UnauthorizedException } from "@/utils/http/http-exceptions";
import { isNil } from "lodash";
import { DateRange } from "react-day-picker";

interface GetMediaParams {
  query?: string | null;
  range?: DateRange | null;
  page?: number;
  limit?: number;
}

export async function getMedia({
  query = null,
  range = null,
  page = 1,
  limit = 12,
}: GetMediaParams) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new UnauthorizedException();
  }

  const whereConditions: {
    userId: string;
    OR: Array<
      | {
          name?: {
            contains: string;
            mode?: "insensitive"; // Tùy chọn không phân biệt chữ hoa chữ thường
          };
        }
      | {
          url?: {
            contains: string;
            mode?: "insensitive"; // Tùy chọn không phân biệt chữ hoa chữ thường
          };
        }
    >;
    createdAt?: {
      gte?: Date;
      lte?: Date;
    };
  } = {
    userId: userId,
    OR: [], // Khởi tạo mảng OR rỗng
  };

  // Thêm điều kiện tìm kiếm cho name và url nếu query được cung cấp
  if (!isNil(query)) {
    whereConditions.OR.push({
      name: {
        contains: query,
        mode: "insensitive", // Không phân biệt chữ hoa chữ thường
      },
    });

    whereConditions.OR.push({
      url: {
        contains: query,
        mode: "insensitive", // Không phân biệt chữ hoa chữ thường
      },
    });
  }

  // Thêm điều kiện ngày nếu range được cung cấp
  if (!isNil(range)) {
    whereConditions.createdAt = {
      gte: range.from,
      lte: range.to,
    };
  }

  const media = await prisma.media.findMany({
    where: whereConditions,
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalItems = await prisma.media.count({
    where: whereConditions,
  });

  return {
    data: media,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page,
  };
}
