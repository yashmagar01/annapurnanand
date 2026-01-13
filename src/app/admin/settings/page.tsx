'use client';

import { Bell, Moon, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-heading)]">
          Settings
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Manage your admin preferences.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6 max-w-2xl">
        {/* Notifications */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--riverbelt-blue-50)] flex items-center justify-center">
              <Bell className="text-[var(--riverbelt-blue)]" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--text-primary)]">Notifications</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Receive email notifications for new orders and low stock alerts.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--herbal-green)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--herbal-green)]"></div>
            </label>
          </div>
        </div>

        {/* Dark Mode (Placeholder) */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--premium-gold-50)] flex items-center justify-center">
              <Moon className="text-[var(--premium-gold-dark)]" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--text-primary)]">Dark Mode</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Coming soon! Switch to a darker theme for the admin panel.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-not-allowed">
              <input type="checkbox" disabled className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full opacity-50"></div>
            </label>
          </div>
        </div>

        {/* Security (Placeholder) */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--herbal-green-50)] flex items-center justify-center">
              <Shield className="text-[var(--herbal-green)]" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--text-primary)]">Security</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Password protection and two-factor authentication coming in future updates.
              </p>
              <button className="mt-3 px-4 py-2 bg-[var(--herbal-green)] text-white rounded-lg text-sm font-medium hover:bg-[var(--herbal-green-dark)] transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
