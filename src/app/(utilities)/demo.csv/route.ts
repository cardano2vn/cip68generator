import { ipfs } from "./ipfs";

export async function GET() {
  const csvHeader = ["assetName", "metadata[name]", "metadata[image]", "metadata[mediaType]", "metadata[rarity]", "receiver"];
  const prefix = [...Array(3)].map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join("");
  const data = [...Array(9)].map((_, index) => [
    `${prefix}00${index + 1}`,
    `${prefix} #00${index + 1}`,
    `ipfs://${ipfs[Math.floor(Math.random() * ipfs.length)].cid}`,
    `image/png`,
    ["Common", "Legendary", "Mythic", "Rare"][Math.floor(Math.random() * 4)],
    ``,
  ]);

  const csvString = [csvHeader.join(","), ...data.map((row) => row.join(","))].join("\n");

  return new Response(csvString, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=${prefix}.csv`,
    },
  });
}
