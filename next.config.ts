import type { NextConfig } from "next";

const productionCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self' https://vitals.vercel-insights.com https://*.vercel-insights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const sharedSecurityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

function securityHeaders() {
  // Webpack dev (eval source maps + HMR) needs relaxed CSP; strict CSP is prod-only.
  if (process.env.NODE_ENV !== "production") {
    return sharedSecurityHeaders;
  }

  return [
    ...sharedSecurityHeaders,
    { key: "Content-Security-Policy", value: productionCsp },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
  ];
}

const nextConfig: NextConfig = {
  // firebase-admin uses Node-only deps (gRPC); must not be bundled for Vercel serverless.
  serverExternalPackages: ["firebase-admin"],
  async headers() {
    const rules = [
      {
        source: "/(.*)",
        headers: securityHeaders(),
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
