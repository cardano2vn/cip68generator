import { AssetInput } from "@/types";
import { deserializeAddress, MeshWallet } from "@meshsdk/core";

export function convertObject(data: string[][], wallet?: MeshWallet): AssetInput[] {
  if (!data || data.length === 0) {
    throw new Error("Dữ liệu CSV trống hoặc không hợp lệ");
  }

  const headers = data[0]; // Cache header
  const hasQuantity = headers.includes("quantity"); // Kiểm tra xem có cột quantity không

  return data
    .slice(1)
    .filter((row) => row.some((value) => value !== null && value !== undefined && value.trim() !== ""))
    .map((row) =>
      row.reduce(
        (acc, curr, index) => {
          const key = headers[index];

          if (!key) {
            throw new Error(`Header không xác định tại cột ${index}`);
          }

          if (key.startsWith("metadata[") && key.endsWith("]")) {
            const metadataKey = key.slice(9, -1);
            if (!acc.metadata) {
              acc.metadata = {};
            }
            acc.metadata[metadataKey] = curr || "";
          } else if (key === "assetName") {
            acc.assetName = curr || "";
          } else if (key === "quantity") {
            acc.quantity = curr || "1"; // Gán "1" nếu giá trị rỗng
          } else if (key === "receiver") {
            acc.receiver = curr || "";
          } else {
            throw new Error(`Cột không hợp lệ: ${key}`);
          }

          return acc;
        },
        {
          assetName: "",
          quantity: hasQuantity ? "" : "1",
          receiver: "",
          metadata: {
            _pk: wallet ? deserializeAddress(wallet.getChangeAddress()).pubKeyHash : "",
          },
        } as AssetInput,
      ),
    )
    .map((asset) => {
      // Đảm bảo quantity luôn có giá trị, mặc định "1" nếu không được gán
      if (!asset.quantity) {
        asset.quantity = "1";
      }
      if (!asset.assetName || !asset.receiver) {
        throw new Error(`Dòng dữ liệu thiếu trường bắt buộc: ${JSON.stringify(asset)}`);
      }
      return asset;
    });
}
