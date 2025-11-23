import React from 'react';

const Header = ({ darkMode, onDarkModeToggle, logo }) => {
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
    }
  };

  return (
    <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            {/* Circular Logo */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 flex items-center justify-center bg-white">
              {logo ? (
                <img 
                  src={logo} 
                  alt="FinalHealth Logo" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-blue-600 font-bold text-lg">FH</div>
              )}
            </div>
            <span className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              FinalHealth
            </span>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center space-x-4">
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Kristine</span>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
            }`}>
              K
            </div>
            <button
              onClick={onDarkModeToggle}
              className={`p-2 rounded-lg text-xl hover:bg-opacity-10 transition-colors ${
                darkMode ? 'hover:bg-white' : 'hover:bg-gray-200'
              }`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={handleLogout}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 hover:bg-red-900' 
                  : 'border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;