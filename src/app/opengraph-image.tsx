import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          backgroundColor: "#1a1444",
          backgroundImage:
            "radial-gradient(circle at 50% 20%, #2e2386 0%, #1a1444 60%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 999,
            background: "#9f90e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            color: "#1a1444",
          }}
        >
          &#9650;
        </div>
        <div style={{ display: "flex", fontSize: 52, color: "#fffdf8", fontWeight: 600 }}>
          L&apos;Alchimie des Nombres
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#cdc6f5" }}>
          Les mathématiques, transmutées autrement.
        </div>
      </div>
    ),
    { ...size }
  );
}
