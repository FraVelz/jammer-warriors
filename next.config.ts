import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    const rules = [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];

    // Only in production — never override /_next cache headers in dev (breaks HMR).
    if (process.env.NODE_ENV === "production") {
      rules.unshift({
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      });
    }

    return rules;
  },
};

export default nextConfig;
