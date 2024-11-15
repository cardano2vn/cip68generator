"use server";
import { IPFS_ENDPOINT } from "@/constants";
import mimeTypes from "@/constants/mime-types";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { UnauthorizedException } from "@/utils/http/http-exceptions";
import axios from "axios";

export async function kudoUpload(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new UnauthorizedException();
  }
  try {
    const response = await axios.post(
      IPFS_ENDPOINT +
        "/api/v0/add?stream-channels=true&pin=false&wrap-with-directory=false&progress=false",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (!response.data) {
      throw new Error("Empty response data from upload");
    }
    if (typeof response.data === "object") {
      const { Hash, Name } = response.data;
      await cp(Hash, Name).then(async ({ data, result, message }) => {
        if (!result) {
          throw new Error(message);
        }
        const { cid, name } = data;
        return await prisma.media.upsert({
          where: {
            url: `ipfs://${cid}`,
          },
          update: {},
          create: {
            userId: userId,
            name: name,
            type:
              mimeTypes[name.split(".").pop()?.toLowerCase() ?? ""] ||
              "unknown",
            url: `ipfs://${cid}`,
          },
        });
      });
    } else {
      Promise.all(
        response.data
          .trim()
          .split("\n")
          .map((line: string) => {
            const { Hash, Name } = JSON.parse(line);
            return cp(Hash, Name);
          }),
      ).then(async (result) => {
        return await prisma.media.createMany({
          data: result
            .map((item) => {
              if (!item.result) return null;
              const { cid, name } = item.data;
              return {
                userId: userId,
                name: name,
                type:
                  mimeTypes[name.split(".").pop()?.toLowerCase()] || "unknown",
                url: `ipfs://${cid}`,
              };
            })
            .filter((item) => item !== null),
          skipDuplicates: true,
        });
      });
    }
    return {
      message: "success",
      result: true,
    };
  } catch (e) {
    return {
      message: e instanceof Error ? e.message : "Unknown error",
      result: false,
    };
  }
}

async function cp(argCid: string, argName: string) {
  const url =
    IPFS_ENDPOINT + `/api/v0/files/cp?arg=/ipfs/${argCid}&arg=/${argName}`;
  try {
    const response = await axios.post(url, null, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return {
      data: { cid: argCid, name: argName },
      result: true,
      message: "success",
    };
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      if (
        e.response.status === 500 &&
        e.response.data.Message.includes(
          "directory already has entry by that name",
        )
      ) {
        return {
          data: { cid: argCid, name: argName },
          result: true,
          message: "success",
        };
      }
    }
    return {
      data: { cid: argCid, name: argName },
      result: false,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
