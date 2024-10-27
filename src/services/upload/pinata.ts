"use server";
const PINATA_JWT = process.env.PINATA_JWT!;
export async function pinataUpload(formData: FormData) {
  console.log("formData", formData);
  const request = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    },
  );
  const response = await request.json();
  return response;
}
