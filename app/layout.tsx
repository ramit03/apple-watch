import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";


const sfPro = localFont({
  src:[
    {
      path: '/fonts/SF-Pro-Display-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/SF-Pro-Display-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  title: "Create Your Apple Watch",
  description: "Apple Watch Studio, Choose a case. Pick a band. Create your own style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sfPro.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
