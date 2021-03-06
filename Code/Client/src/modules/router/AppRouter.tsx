import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {useAppSelector} from '../../store/hooks';
import {selectAuthenticated} from '../../store/auth/authSlice';
import Homepage from '../homepage/Homepage';
import NotAuthorized403 from '../http-errors/NotAuthorized403';
import NotFound404 from '../http-errors/NotFound404';
import ServerError500 from '../http-errors/ServerError500';
import links from '../../values/links';
import Dashboard from '../dashboard/Dashboard';

/**
 * Application router.
 * Renders given component based on address of the page.
 * @constructor
 */
const AppRouter = () => {
  const authenticated = useAppSelector(selectAuthenticated)

  return (
    <Router>
      <Routes>
        <Route
          path={links.ROOT.URL}
          element={<>{authenticated ? <Navigate to={links.DASHBOARD.URL}/> : <Homepage/>}</>}
        />
        <Route path={links.NO_AUTHORIZED_403.URL} element={<NotAuthorized403/>}/>
        <Route path={links.NOT_FOUND_404.URL} element={<NotFound404/>}/>
        <Route path={links.SERVER_ERROR_500.URL} element={<ServerError500/>}/>
        <Route path={links.DASHBOARD.URL + "/*"} element={<Dashboard/>}/>
        <Route path="/home" element={<Homepage/>}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;