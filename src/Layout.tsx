import React from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  return <main className="container-fluid">{children}</main>;
}
