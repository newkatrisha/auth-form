import type { Metadata } from "next";
import "@/styles/auth-form.css";

export const metadata: Metadata = {
  title: "Auth Form",
  description:
    "A responsive authentication form with login and signup functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Inline critical styles to prevent FOUC */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          html, body {
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
            min-height: 100vh;
          }
        `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
