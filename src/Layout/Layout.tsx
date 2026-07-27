import type { ReactNode } from "react";
import Header from "../Components/Header";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({
  children,
  className = "",
}: LayoutProps) {
  return (
    <>
      <Header />
      <main className={className}>{children}</main>
    </>
  );
}