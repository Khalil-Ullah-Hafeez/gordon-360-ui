import { useIsAuthenticated } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import checkInService from 'services/checkIn';

const AppRedirect = () => {
  const [enrollmentCheckinComplete, setEnrollmentCheckinComplete] = useState(true);
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      checkInService.getStatus().then((status) => setEnrollmentCheckinComplete(status ?? true));
    }
  }, [isAuthenticated, location]);

  if (
    isAuthenticated &&
    !enrollmentCheckinComplete &&
    location.pathname !== '/enrollmentcheckin' &&
    location.pathname !== '/wellness'
  ) {
    return <Navigate to="/enrollmentcheckin" />;
  }

  return null;
};

export default AppRedirect;
