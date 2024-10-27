"use server";
export async function infuraUpload(formData: FormData) {
  const request = await fetch("https://ipfs.infura.io:5001/api/v0/add", {
    method: "POST",
    headers: {
      Authorization:
        `Basic` +
        btoa(
          "b547f045774e4e2e9b51008cbb69780a:UTW70tvdiQVgUhoLd3Q2rNetffSXA2wUPW8k9xDfzh1hvMX0mOQYUA",
        ),
    },
    body: formData,
  });
  const response = await request.json();
  return response;
}
