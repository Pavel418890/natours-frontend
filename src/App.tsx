import { Routes, Route, Navigate } from 'react-router-dom';

import HeadingSecondary from './components/UI/HeadingSecondary';
import ProfilePage from './features/user/Profile/Profile';
import RequireAuth from './components/Layout/RequireAuth';
import SignInForm from './features/user/SignIn';
import SignUpForm from './features/user/SignUp';
import TourDetail from './features/tours/TourDetail/TourDetail';
import ToursOverview from './features/tours/ToursOverview';
import UserEmailConfirmation from './features/user/UserEmailConfirmation';
import CustomerBookings from './features/user/Profile/CustomerBookings';

const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate replace to={'/tours'} />} />
      <Route path={'tours'} element={<ToursOverview />} />
      <Route
        path={'tours/:tourSlug'}
        element={
          <RequireAuth>
            <TourDetail />
          </RequireAuth>
        }
      />
      <Route path='signin' element={<SignInForm />} />
      <Route path='signup' element={<SignUpForm />} />
      <Route
        path={'email-confirmation/:emailConfirmationToken/'}
        element={<UserEmailConfirmation />}
      />
      <Route
        path='profile'
        element={
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        }
      />
      <Route path='/bookings'
             element={
               <RequireAuth>
                 <CustomerBookings/>
               </RequireAuth>}
     />
      <Route path='/healthz' element={<h3>Hello from Natours React App</h3>} />
      <Route
        path={'*'}
        element={
          <main style={{ padding: '1rem' }}>
            <HeadingSecondary innerText={'Not implemented yet  😌'} />
          </main>
        }
      />
    </Routes>
  );
};

export default App;
