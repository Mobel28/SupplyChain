import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Nexus ERP",
  description: "Advanced eCommerce Inventory & Supply Chain UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.bodyWrapper}>
        <Sidebar />
        <div className={styles.mainWrapper}>
          <Topbar />
          <main className={styles.mainContent}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
