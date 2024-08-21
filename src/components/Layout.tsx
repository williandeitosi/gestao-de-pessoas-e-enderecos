import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className='flex h-screen bg-zinc-900 '>
            <Sidebar />
            <div className='flex-1 flex flex-col overflow-hidden'>
                <Navbar />
                <main className='flex-1 overflow-x-hidden overflow-y-auto bg-zinc-800  p-6'>
                    {children}
                </main>
            </div>
        </div>
    )
}