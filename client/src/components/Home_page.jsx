const Home_page = () => {
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
  
    const handleSaveCredentials = () => {
      // Save credentials in a secure way, e.g., to the server or session
    };
  
    return (
      <div className="header">
        <input
          type="text"
          placeholder="Enter IBKR API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter IBKR API Secret"
          value={apiSecret}
          onChange={(e) => setApiSecret(e.target.value)}
        />
        <button onClick={handleSaveCredentials}>Save Credentials</button>
      </div>
    );
  };
  