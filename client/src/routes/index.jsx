import { Routes, Route } from 'react-router-dom'

import { ROUTES } from './routes'
import PortalLayout from '../layouts/PortalLayout'
import NotFoundPage from '../pages/NotFoundPage'
import LoginPage from '../pages/login'
import ProtectedRoute from './ProtectedRoute'
import ProfilePage from '../pages/ProfilePage'

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <PortalLayout />
          </ProtectedRoute>
        }
      >
        {ROUTES.map((item, index) => (
          <Route key={index} path={item.url} element={item.component} />
        ))}
      </Route>

      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default Router
