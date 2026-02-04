import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useTheme } from '@/Contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function GuestLayout({ children }) {
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <div className="flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-primary/10 to-purple-600/10 rounded-full blur-3xl" />
            </div>

            {/* Theme toggle in corner */}
            <button
                onClick={toggleDarkMode}
                className="fixed top-4 right-4 p-3 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-lg transition-all duration-300 z-10"
            >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="relative">
                <Link href="/" className="block hover:scale-105 transition-transform duration-300">
                    <ApplicationLogo className="h-12" />
                </Link>
            </div>

            <div className="relative mt-8 w-full overflow-hidden bg-card/80 backdrop-blur-xl px-8 py-8 shadow-2xl shadow-black/10 dark:shadow-black/30 border border-border/50 sm:max-w-md sm:rounded-2xl">
                {/* Gradient accent on top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />
                {children}
            </div>

            {/* Footer link */}
            <p className="relative mt-6 text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href={route('register')} className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Sign up
                </Link>
            </p>
        </div>
    );
}
