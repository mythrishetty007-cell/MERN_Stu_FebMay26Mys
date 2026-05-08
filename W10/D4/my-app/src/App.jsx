import './App.css'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { MainLayout } from "./layouts/MainLayout";
import { AboutPage } from "./pages/AboutPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  const isAuthenticated = true;
  return (
    
      <BrowserRouter>
        <Routes>
          <Route 
          path="/"
          element={<MainLayout />}>

              {/* Index Route: default */}
              <Route
              index element = {<HomePage />}/>
              
              {/* About Page */}
              <Route 
              path="about"
              element = {<AboutPage />}/>
             
              {/* Products Page */}
              <Route 
              path="products"
              element = {<ProductsPage />}/>
              
              {/* Dynamic Route */}
              <Route 
              path="products/:id"
              element = {<ProductDetailsPage />}/>

              {/* Protected Route */}
              <Route 
              path="dashboard"
              element = {
                <ProtectedRoute  
                isAuthenticated={isAuthenticated}>
                  <DashboardPage />
              </ProtectedRoute>
              }/>

              {/* 404 not found route */}
              <Route 
              path="*"
              element = {<NotFoundPage />}/>

          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App