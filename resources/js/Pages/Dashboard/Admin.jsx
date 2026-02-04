import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function AdminDashboard({ stats, recentUsers, pendingManagers }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Quick Stats */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-5">
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow">
                            <div className="text-sm font-medium text-gray-500">Total Users</div>
                            <div className="mt-2 text-3xl font-bold text-gray-900">{stats.totalUsers}</div>
                        </div>
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow">
                            <div className="text-sm font-medium text-gray-500">Total Managers</div>
                            <div className="mt-2 text-3xl font-bold text-gray-900">{stats.totalManagers}</div>
                        </div>
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow">
                            <div className="text-sm font-medium text-gray-500">Verified</div>
                            <div className="mt-2 text-3xl font-bold text-green-600">{stats.verifiedManagers}</div>
                        </div>
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow">
                            <div className="text-sm font-medium text-gray-500">Pending Verification</div>
                            <div className="mt-2 text-3xl font-bold text-amber-600">{stats.pendingVerification}</div>
                        </div>
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow">
                            <div className="text-sm font-medium text-gray-500">Total Inquiries</div>
                            <div className="mt-2 text-3xl font-bold text-gray-900">{stats.totalInquiries}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Pending Verification */}
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                <h3 className="text-lg font-medium text-gray-900">Pending Verification</h3>
                                <Link href={route('admin.verification-queue')} className="text-sm text-amber-600 hover:underline">
                                    View all
                                </Link>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {pendingManagers.length > 0 ? (
                                    pendingManagers.map((pm) => (
                                        <div key={pm.id} className="flex items-center justify-between px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{pm.business_name || pm.user?.name}</p>
                                                <p className="text-sm text-gray-500">{pm.city}, {pm.province}</p>
                                            </div>
                                            <Link
                                                href={route('admin.verify', pm.id)}
                                                method="post"
                                                as="button"
                                                className="rounded bg-green-600 px-3 py-1 text-sm font-semibold text-white hover:bg-green-500"
                                            >
                                                Verify
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-4 text-sm text-gray-500">
                                        No pending verifications.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Users */}
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
                                <Link href={route('admin.users.index')} className="text-sm text-amber-600 hover:underline">
                                    Manage users
                                </Link>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {recentUsers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                            user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href={route('admin.users.index')}
                            className="inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
                        >
                            Manage Users
                        </Link>
                        <Link
                            href={route('admin.verification-queue')}
                            className="inline-flex items-center rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500"
                        >
                            Verification Queue
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
