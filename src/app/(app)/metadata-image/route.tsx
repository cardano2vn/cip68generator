import { ImageResponse } from "next/og";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jsonString = searchParams.get("metadata");

  if (!jsonString) {
    return new Response("No metadata provided", { status: 400 });
  }

  let metadata;
  try {
    metadata = JSON.parse(jsonString);
  } catch (e) {
    return new Response(e instanceof Error ? e.message : "unknown error", {
      status: 400,
    });
  }

  const ThumbnailComponent = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "800px",
        height: "600px",
        backgroundColor: "#44475a", // Màu nền tối
        fontFamily: "monospace",
        fontSize: "30px",
        fontWeight: "bold",
        color: "#f1fa8c", // Màu chữ sáng
        padding: "5px",
        boxSizing: "border-box",
        whiteSpace: "pre-wrap",
        overflow: "hidden",
        textAlign: "left",
      }}
    >
      <pre
        style={{
          margin: 0,
          maxHeight: "100%",
          overflow: "hidden",
        }}
      >
        <code
          style={{
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {JSON.stringify(metadata, null, 2)}
        </code>
      </pre>
    </div>
  );

  return new ImageResponse(ThumbnailComponent, {
    width: 800,
    height: 600,
  });
}
