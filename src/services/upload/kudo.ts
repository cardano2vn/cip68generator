/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import mimeTypes from "@/constants/mimeTypes";
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
      "http://18.143.169.117:5001/api/v0/add?stream-channels=true&pin=false&wrap-with-directory=false&progress=false",
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
      return cp(Hash, Name);
    }
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
        data: result.map((item) => ({
          userId: userId,
          name: item.name,
          type:
            mimeTypes[item.name.split(".").pop()?.toLowerCase()] || "unknown",
          url: `ipfs://${item.cid}`,
        })),
        skipDuplicates: true,
      });
    });
  } catch (error) {
    console.error("Error during file upload or processing:", error);
    throw error;
  }
}

async function cp(argCid: string, argName: string) {
  const url = `http://18.143.169.117:5001/api/v0/files/cp?arg=/ipfs/${argCid}&arg=/${argName}`;
  try {
    const response = await axios.post(url, null, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    return { cid: argCid, name: argName, status: "success" };
  } catch (error: any) {
    if (error.response) {
      if (
        error.response.status === 500 &&
        error.response.data.Message.includes(
          "directory already has entry by that name",
        )
      ) {
        return { cid: argCid, name: argName, status: "success" };
      }
    }
    return { name: argName, status: "failed" };
  }
}
