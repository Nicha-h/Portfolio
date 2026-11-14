import { ImageResponse } from "next/og";
import { profile } from "@/models/profile";

export const alt = profile.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card in the portfolio's desktop style: a window on the pastel wallpaper
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #b8c0ff, #d9c8ff)",
          color: "#24203a",
        }}
      >
        <div
          style={{
            width: 920,
            display: "flex",
            flexDirection: "column",
            background: "#fffdf7",
            border: "6px solid #24203a",
            borderRadius: 32,
            boxShadow: "18px 18px 0 #24203a",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "18px 32px",
              background: "#5a48e8",
              color: "#fff",
              fontSize: 34,
              borderBottom: "6px solid #24203a",
              borderRadius: "26px 26px 0 0",
            }}
          >
            about.txt
          </div>
          <div style={{ display: "flex", flexDirection: "column", padding: "44px 48px 52px" }}>
            <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>{`hi, i'm ${profile.shortName}`}</div>
            <div style={{ fontSize: 34, color: "#5f5a7c", marginTop: 14 }}>
              {`${profile.name} · CS @ ${profile.universityShort}`}
            </div>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginTop: 32,
                fontSize: 30,
                background: "#ffe98a",
                border: "4px solid #24203a",
                borderRadius: 12,
                padding: "6px 20px",
              }}
            >
              {`${profile.role} · open to internships`}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
