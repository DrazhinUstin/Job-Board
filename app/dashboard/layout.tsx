import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2>Dashboard</h2>
      {children}
    </div>
  );
}
