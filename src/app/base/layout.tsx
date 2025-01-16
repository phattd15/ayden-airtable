// app/base/layout.tsx
import './layout.css'; // Import custom styles for layout

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="base-layout">
      {/* Fixed Top Navbar */}
      <header className="navbar">Navbar</header>

      {/* Main Layout: Sidebar + Scrollable Content */}
      <div className="layout-container">
        <aside className="sidebar">Sidebar</aside>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
