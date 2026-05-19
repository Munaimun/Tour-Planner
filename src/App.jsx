import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import { WishlistProvider } from './contexts/WishlistContext'
import AppLayout from './layout/AppLayout'
import DestinationPage from './pages/DestinationPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import RecommendPage from './pages/RecommendPage'
import TravelPlanPage from './pages/TravelPlanPage'
import WishlistPage from './pages/WishlistPage'

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/destination/:slug" element={<DestinationPage />} />
              <Route path="/destination/:slug/plan/:packageSlug" element={<TravelPlanPage />} />
              <Route path="/recommend" element={<RecommendPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </AuthProvider>
  )
}
