import { useEffect } from 'react';
import { logoutRoute } from '../utils/APIRoutes';

export default function AutoLogout() {
  useEffect(() => {
    // Set load time for detecting refreshes
    sessionStorage.setItem('loadedAt', Date.now());

    const handleBeforeUnload = () => {
      const now = Date.now();
      const loadedAt = sessionStorage.getItem('loadedAt');
      // If loaded recently (<1s ago), it's likely a refresh, don't logout
      if (!loadedAt || (now - parseInt(loadedAt)) > 1000) {
        // Assume closing the app, logout
        const user = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
        if (user) {
          const { _id } = JSON.parse(user);
          try {
            fetch(`${logoutRoute}/${_id}`, { method: 'GET', keepalive: true });
          } catch (e) {
            // Ignore errors during unload
          }
        }
        localStorage.clear();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
}
