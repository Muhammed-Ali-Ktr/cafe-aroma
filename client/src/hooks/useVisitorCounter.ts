import { useEffect, useState } from 'react';

export function useVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Get current count
    const currentCount = parseInt(localStorage.getItem('visitorCount') || '0');
    
    // Check if this is a new session
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().getTime();
    const oneHour = 60 * 60 * 1000;

    if (!lastVisit || now - parseInt(lastVisit) > oneHour) {
      // New visitor or returning after 1 hour
      const newCount = currentCount + 1;
      localStorage.setItem('visitorCount', newCount.toString());
      localStorage.setItem('lastVisit', now.toString());
      setVisitorCount(newCount);
    } else {
      setVisitorCount(currentCount);
    }
  }, []);

  return visitorCount;
}
