import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - RBAC",
  description: "Register to Role Base Access Control",
};

export default function RegisterLayout({
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