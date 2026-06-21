import { ImageResponse } from "next/og";

export const ogImageAlt = "JammerShop – Real Jammers & DIY";
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function OgImage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "#111111",
        padding: "48px 64px",
        fontFamily: "Courier New, Courier, monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 340,
          height: 340,
          marginRight: 64,
          flexShrink: 0,
        }}
      >
        <svg
          width="280"
          height="280"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#88ff88"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12L7 2m0 10l5-10m0 10l5-10m0 10l5-10M4.5 7h15M12 16v6" />
        </svg>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <div
          style={{
            width: 120,
            height: 3,
            background: "#88ff88",
            marginBottom: 32,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          <span style={{ color: "#ff4444" }}>Jammer</span>
          <span style={{ color: "#88ff88" }}>Shop</span>
        </div>

        <div
          style={{
            color: "#aaaaaa",
            fontSize: 28,
            lineHeight: 1.4,
            marginBottom: 48,
          }}
        >
          Real devices • real tutorials • no bullshit
        </div>

        <div style={{ color: "#888888", fontSize: 20 }}>
          Educational and testing use only
        </div>
      </div>
    </div>
  );
}

export function createOgImageResponse() {
  return new ImageResponse(<OgImage />, {
    ...ogImageSize,
  });
}
