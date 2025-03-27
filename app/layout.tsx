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
        <link rel="stylesheet" href="styles/auth-form.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
