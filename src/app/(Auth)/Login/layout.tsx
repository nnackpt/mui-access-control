import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - RBAC",
  description: "Login to Role Base Access Control",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        {children}
    </div>
  );
}