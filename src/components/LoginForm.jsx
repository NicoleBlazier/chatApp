import { useState } from 'react';
import axios from 'axios';

const projectID = 'bb67d5b2-876c-405a-ac3b-4ee3bd692d3e';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');
    } catch (err) {
      setError('Oops, incorrect credentials.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <h1 className="login-form-title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-inputs">
            <input className="login-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </div>
          <div align="center" className="login-button">
            <button type="submit" className="login-btn">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>

  );
};

export default Modal;
