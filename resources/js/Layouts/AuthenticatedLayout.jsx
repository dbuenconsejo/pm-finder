import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import NotificationBell from '@/Components/NotificationBell';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useTheme } from '@/Contexts/ThemeContext';

// Icons
const SunIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const MenuIcon = () => (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20" stroke="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fill="currentColor" />
    </svg>
);

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { darkMode, toggleDarkMode } = useTheme();
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--background)] hex-pattern">
            <nav className="border-b border-[var(--layer-3)] bg-[var(--layer-1)]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto" />
                                </Link>
                            </div>

                            <div className="hidden space-x-2 sm:-my-px sm:ms-10 sm:flex sm:items-center">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('search')}
                                    active={route().current('search')}
                                >
                                    Find PMs
                                </NavLink>
                                {user.role === 'manager' && (
                                    <NavLink
                                        href={route('inquiries.index')}
                                        active={route().current('inquiries.*')}
                                    >
                                        Inquiries
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center gap-3">
                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-amber-500 hover:bg-[var(--layer-2)] transition-colors"
                                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {darkMode ? <SunIcon /> : <MoonIcon />}
                            </button>

                            {/* Notification Bell */}
                            <NotificationBell />

                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-lg border border-[var(--layer-3)] bg-[var(--layer-1)] px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition duration-150 ease-in-out hover:text-amber-500 hover:border-amber-500 focus:outline-none"
                                            >
                                                <span className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-semibold">
                                                    {user.name?.[0]?.toUpperCase() || 'U'}
                                                </span>
                                                {user.name}
                                                <ChevronDownIcon />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center gap-2 sm:hidden">
                            {/* Mobile Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-amber-500 transition-colors"
                            >
                                {darkMode ? <SunIcon /> : <MoonIcon />}
                            </button>

                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-[var(--text-tertiary)] transition duration-150 ease-in-out hover:bg-[var(--layer-2)] hover:text-[var(--text-primary)] focus:bg-[var(--layer-2)] focus:text-[var(--text-primary)] focus:outline-none"
                            >
                                {showingNavigationDropdown ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2 border-t border-[var(--layer-3)]">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('search')}
                            active={route().current('search')}
                        >
                            Find PMs
                        </ResponsiveNavLink>
                        {user.role === 'manager' && (
                            <ResponsiveNavLink
                                href={route('inquiries.index')}
                                active={route().current('inquiries.*')}
                            >
                                Inquiries
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="border-t border-[var(--layer-3)] pb-1 pt-4">
                        <div className="px-4 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-semibold">
                                {user.name?.[0]?.toUpperCase() || 'U'}
                            </span>
                            <div>
                                <div className="text-base font-medium text-[var(--text-primary)]">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-[var(--text-tertiary)]">
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-[var(--layer-1)] border-b border-[var(--layer-3)]">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
