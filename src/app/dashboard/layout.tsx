import Sidebar from '@/components/Sidebar';
import ChannelList from '@/components/ChannelList';
import { BackgroundBeams } from '@/components/ui/background-beams';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-[calc(100vh-65px)] w-full overflow-hidden bg-zinc-900 text-white">
            {/* Sidebar (Server List) */}
            <Sidebar />

            {/* Main Content Area Wrapper - Pushed right by sidebar width */}
            <div className="flex-1 flex ml-[72px]">
                {/* Channel List */}
                <ChannelList />

                {/* Main Content */}
                <main className="flex-1 flex flex-col relative h-full overflow-hidden min-w-0 bg-[#313338]">
                    <BackgroundBeams className="opacity-20" />
                    {children}
                </main>
            </div>
        </div>
    );
}
