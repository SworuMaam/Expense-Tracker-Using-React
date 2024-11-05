import React from 'react';

function Sidebar() {
  return (
    <div className="fixed bg-gray-800 text-white w-64 h-screen p-4">
      <h2 className="text-3xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li><a href="/home" className="hover:text-blue-400">Home</a></li>
        <li><a href="/categories" className="hover:text-blue-400">Categories</a></li>
        <li><a href="/transactions" className="hover:text-blue-400">Transactions</a></li>
        <li><a href="/calendars" className="hover:text-blue-400">Calendars</a></li>
        <li><a href="/events" className="hover:text-blue-400">Events</a></li>
        <li><a href="/settings" className="hover:text-blue-400">Settings</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
