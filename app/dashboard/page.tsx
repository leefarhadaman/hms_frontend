'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    // Only use auth after mounting to avoid SSR issues
    const auth = mounted ? useAuth() : null;
    
    useEffect(() => {
        if (mounted && auth && !auth.isAuthenticated) {
            router.push('/login');
        }
    }, [mounted, auth, router]);

    const handleLogout = async () => {
        if (auth) {
            await auth.logout();
            router.push('/login');
        }
    };

    // Show loading while mounting or if not authenticated
    if (!mounted || !auth || !auth.isAuthenticated || !auth.user) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">HMS</h1>
                    <p className="text-gray-500">Hospital Management System</p>
                </div>

                {/* Dashboard Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                    {/* Welcome Message */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome, {auth.user.email.split('@')[0]}!
                    </h2>

                    {/* Role Badge */}
                    <div className="inline-block bg-gray-100 text-gray-900 px-4 py-1 rounded-lg text-sm font-medium mb-8">
                        {auth.user.role}
                    </div>

                    {/* Email */}
                    <p className="text-gray-600 mb-8">
                        {auth.user.email}
                    </p>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                        Logout
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>© 2025 Hospital Management System</p>
                </div>
            </div>
        </div>
    );
}
