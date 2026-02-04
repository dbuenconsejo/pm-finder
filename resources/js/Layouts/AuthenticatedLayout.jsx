import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import NotificationBell from '@/Components/NotificationBell';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useTheme } from '@/Contexts/ThemeContext';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { darkMode, toggleDarkMode } = useTheme();
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-background relative">
            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/15 to-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-500/10 to-pink-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-tl from-cyan-500/10 to-primary/5 rounded-full blur-3xl" />
                
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
            </div>

            <nav className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
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
                                className="p-2.5 rounded-xl border border-transparent text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
                                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>

                            {/* Notification Bell */}
                            <NotificationBell />

                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-xl">
                                            <button
                                                type="button"
                                                className="group inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card px-3 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 focus:outline-none"
                                            >
                                                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-primary font-semibold text-sm shadow-md group-hover:shadow-lg transition-shadow">
                                                    {user.name?.[0]?.toUpperCase() || 'U'}
                                                </span>
                                                <span className="hidden lg:inline">{user.name}</span>
                                                <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
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
                                className="p-2.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300"
                            >
                                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>

                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center rounded-xl p-2.5 text-muted-foreground transition-all duration-300 hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary focus:outline-none"
                            >
                                {showingNavigationDropdown ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden border-t border-border/50 bg-card/95 backdrop-blur-md'}>
                    <div className="space-y-1 py-3">
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

                    <div className="border-t border-border/50 py-4">
                        <div className="px-4 flex items-center gap-3">
                            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-primary font-semibold text-lg shadow-md">
                                {user.name?.[0]?.toUpperCase() || 'U'}
                            </span>
                            <div>
                                <div className="text-base font-semibold text-foreground">
                                    {user.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 space-y-1">
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
                <header className="relative z-10 bg-card border-b border-border">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="relative z-10">{children}</main>
        </div>
    );
}
