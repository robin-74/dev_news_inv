import React, { useState } from "react";

const Navbar = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');

  const handleSaveCredentials = () => {
    // Save the credentials to local storage (or another method)
    localStorage.setItem('ibkrApiKey', apiKey);
    localStorage.setItem('ibkrApiSecret', apiSecret);
    alert('IBKR API credentials saved!');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold sliding-title">Dev News</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter IBKR API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="p-2 rounded"
          />
          <input
            type="password"
            placeholder="Enter IBKR API Secret"
            value={apiSecret}
            onChange={(e) => setApiSecret(e.target.value)}
            className="p-2 rounded"
          />
          <button
            onClick={handleSaveCredentials}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save API Credentials
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
