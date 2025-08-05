import type { Metadata } from "next";
import localFont from "next/font/local";
import "./style.css";
import "./globals.css";
import Provider from "@/components/provider/Provider";
import { Footer } from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mediplus - Free Medical and Doctor Directory HTML Template.",
  description: "Mediplus - Free Medical and Doctor Directory HTML Template.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="keywords" content="Site keywords here" />
        <meta name="description" content="" />
        <meta name="copyright" content="" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/new-favicon.ico" />

        <link
          href="https://fonts.googleapis.com/css?family=Poppins:200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap"
          rel="stylesheet"
        />

        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/nice-select.css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/icofont.css" />
        <link rel="stylesheet" href="/css/slicknav.min.css" />
        <link rel="stylesheet" href="/css/owl-carousel.css" />
        <link rel="stylesheet" href="/css/datepicker.css" />
        <link rel="stylesheet" href="/css/animate.min.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/normalize.css" />
        {/* <link rel="stylesheet" href="/css/style.css" /> */}
        <link rel="stylesheet" href="/css/responsive.css" />
      </head>
      <body>
        <Provider>
          <Header />
          <div className="py-5">{children}</div>
          <Footer />
        </Provider>
      </body>
      {/* <Script src="js/jquery.min.js"></Script>

      <Script src="js/jquery-migrate-3.0.0.js"></Script>

      <Script src="js/jquery-ui.min.js"></Script>

      <Script src="js/easing.js"></Script>

      <Script src="js/colors.js"></Script>
      <Script src="js/popper.min.js"></Script>
      <Script src="js/bootstrap-datepicker.js"></Script>
      <Script src="js/jquery.nav.js"></Script>
      <Script src="js/slicknav.min.js"></Script>
      <Script src="js/jquery.scrollUp.min.js"></Script>
      <Script src="js/niceselect.js"></Script>
      <Script src="js/tilt.jquery.min.js"></Script>
      <Script src="js/owl-carousel.js"></Script>
      <Script src="js/jquery.counterup.min.js"></Script>
      <Script src="js/steller.js"></Script>
      <Script src="js/wow.min.js"></Script>
      <Script src="js/jquery.magnific-popup.min.js"></Script>
      <Script src="http://cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.3/waypoints.min.js"></Script>
      <Script src="js/bootstrap.min.js"></Script>
      <Script src="js/main.js"></Script> */}
    </html>
  );
}
