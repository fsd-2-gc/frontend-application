import type { Metadata } from "next";
import "./assets/css/style.scss";
import BootstrapScriptLoader from "@/app/loaders/BootstrapScriptLoader";

export const metadata: Metadata = {
  title: "Roosh",
  description: "Roosh website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="w-100">
        {children}
        <BootstrapScriptLoader />
        </body>
        </html>
    );
}

