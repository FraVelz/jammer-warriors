type OgImageLegalProps = {
  title: string;
  description: string;
};

export function OgImageLegal({ title, description }: OgImageLegalProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#111111",
        padding: "64px 72px",
        fontFamily: "Courier New, Courier, monospace",
      }}
    >
      <div
        style={{
          width: 120,
          height: 3,
          background: "#88ff88",
          marginBottom: 40,
        }}
      />

      <div
        style={{
          color: "#88ff88",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 24,
        }}
      >
        JammerShop
      </div>

      <div
        style={{
          color: "#ffffff",
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: 28,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#aaaaaa",
          fontSize: 28,
          lineHeight: 1.45,
          maxWidth: 900,
        }}
      >
        {description}
      </div>
    </div>
  );
}
