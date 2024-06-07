import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">User Dashboard</h1>
        </div>
        <nav className="p-4">
          <ul>
            <li className="mb-2">
              <a href="#" className="block p-2 rounded bg-blue-500 text-white">Overview</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 rounded hover:bg-blue-100">Profile</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 rounded hover:bg-blue-100">Settings</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 rounded hover:bg-blue-100">Logout</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-6">Welcome, User!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold">Profile</h3>
            <p className="mt-2">Manage your profile information.</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold">Settings</h3>
            <p className="mt-2">Adjust your account settings.</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold">Notifications</h3>
            <p className="mt-2">Check your latest notifications.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
