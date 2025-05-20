import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus: (status) => status < 500, // allow 401 etc. to be handled
        });

        if (
          res.headers['content-type']?.includes('application/json') &&
          res.data &&
          typeof res.data === 'object' &&
          !Array.isArray(res.data)
        ) {
          setUser(res.data);
        } else {
          setUser(null);
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Token invalid or expired');
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Just added logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
