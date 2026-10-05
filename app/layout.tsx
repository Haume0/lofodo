import "./globals.css";

import { JetBrains_Mono, Lato } from "next/font/google";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Lofodo</title>
        <meta
          name="description"
          content="An advanced study strategy, one-on-one for your best attention."
        />
        <meta
          name="keywords"
          content="cubidron, haume, emin, erçoban, lofi, lofodo, pomodoro, lofodo pomodoro, lofodo study, lofodo study strategy, lofodo study method, lofodo study technique, lofodo study plan, lofodo study planner, lofodo study app, lofodo study tool, lofodo study guide, lofodo study tips, lofodo study habits, lofodo study schedule, lofodo study routine, lofodo study system"
        />
        <meta name="author" content="Haume" />
        <meta name="copyright" content="Haume" />
        <meta name="robots" content="index, follow" />
        <meta name="rating" content="general" />
        <meta name="theme-color" content="#121212" />
        {/* iOS home screen uses these instead of the manifest icons and name. */}
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Lofodo" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body
        className={`${lato.variable} ${lato.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
