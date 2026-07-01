import { Outlet } from 'react-router-dom';
import CommunitySidebar from '../components/CommunitySidebar';
import Header from '../components/Header';

export default function CommunityLayout() {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans antialiased text-foreground selection:bg-purple-500/30">
      <CommunitySidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background/50 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
