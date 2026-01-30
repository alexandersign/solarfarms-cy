'use client';

export function LogoutButton() {
  const handleLogout = async () => {
    await fetch('/api/docs-auth', { method: 'DELETE' });
    window.location.href = '/internal-docs/login';
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
    >
      Logout
    </button>
  );
}
