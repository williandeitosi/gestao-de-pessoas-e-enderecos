import Link from 'next/link'

import { HomeIcon, UsersIcon, MapPinIcon, UserPlusIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'


const sidebarItems = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Users', href: '/users', icon: UsersIcon },
    { name: 'Locations', href: '/Locations', icon: MapPinIcon },
    { name: 'Add User', href: '/add-user', icon: UserPlusIcon },
    { name: 'Config', href: '/config', icon: Cog6ToothIcon }
]


export default function Sidebar() {
    return (
        <div className='flex h-screen w-64 flex-col bg-zinc-900 text-white'>
            <div className='flex items-center justify-center h-16 bg-zinc-800'>
                <MapPinIcon className='h-8 w-8 text-yellow-300' />
                <span className='ml-2 text-xl font-semibold'>E-gest</span>
            </div>
            <nav className='flex-1 overflow-y-auto'>
                <ul className='px-2 py-4'>
                    {sidebarItems.map((item) => (
                        <li key={item.name} className='mb-2'>
                            <Link href={item.href} className='flex items-center px-4 py-2 text-zinc-300 hover:bg-zinc-700 rounded-lg'>
                                <item.icon className='h-6 w-6 mr-3' />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}