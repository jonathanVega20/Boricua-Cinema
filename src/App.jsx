import './App.css'
import { Outlet, BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import NowPlaying from './pages/NowPlaying.jsx';
import ComingSoon from './pages/ComingSoon.jsx';
import Menu from './pages/Menu.jsx';
import Experiences from './pages/Experiences.jsx';
import Login from "./pages/Login/Login.jsx";
import CreateAccount from "./pages/Login/CreateAccount.jsx";
import ValidationEmail from './pages/Login/ValidationEmail.jsx';
import VerifyCode from './pages/Login/VerifyCode.jsx';
import ChangePassword from './pages/Login/ChangePassword.jsx';
import MovieInformation from './pages/MovieInformation.jsx';
import OrderProcess from './pages/OrderProcess.jsx';
import OrdersProvider from './context/OrdersContext.jsx';
import MoviesProvider from './context/MovieContext.jsx';
import OrderReceipt from './pages/OrderReceipt.jsx';
import UserProvider from './context/UserContext.jsx';
import Account from './pages/Account.jsx';
import AccountPaymentMethod from './pages/AccountPaymentMethod.jsx';
import OrderHistory from './pages/OrderHistory.jsx';
import MoviesAccount from './pages/MoviesAccount.jsx';
import AdminDashboard from './pages/admin/Dashboard.jsx';
import AdminMovies from './pages/admin/AdminMovies.jsx';
import AdminFoods from './pages/admin/AdminFoods.jsx';
import AdminRooms from './pages/admin/AdminRooms.jsx';
import AdminAccounts from './pages/admin/AdminAccounts.jsx';
import AdminMyAccount from './pages/admin/AdminMyAccount.jsx';
import ManageMovies from './components/admin/movies/ManageMovies.jsx';
import ManageFoods from './components/admin/foods/ManageFoods.jsx';
import ManageRooms from './components/admin/rooms/ManageRooms.jsx';
import ManageAccount from './components/admin/accounts/ManageAccount.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Unauthorized from './components/Unauthorized.jsx';

export default function App() {
  return (
    <>
      {/* <Outlet /> */}
      {/* <BrowserRouter basename="/~vegrivjo/cinema_boricua"> */}
      <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Outlet />}>
          
              {/* Estas con las rutas publicas  */}
              <Route index element={<Home />}></Route>
              <Route path='now-playing' element={<NowPlaying />}></Route>
              <Route path='coming-soon' element={<ComingSoon />}></Route>
              <Route path='menu' element={<Menu />}></Route>
              <Route path='experiences' element={<Experiences />}></Route>
              <Route path='movie-information/:id' element={<MovieInformation />}></Route>
              <Route path='process-order/:id' element={<OrderProcess />}></Route>
              <Route path='order-receipt/:id' element={<OrderReceipt />}></Route>

              {/* Paginas relacionadas al iniciar sesion o crear cuenta */}
              <Route path='login' element={<Outlet />}>
                <Route index element={<Login />}></Route>
                <Route path='validation-email' element={<ValidationEmail />}></Route>
                <Route path='verify-code' element={<VerifyCode />}></Route>
                <Route path='change-password' element={<ChangePassword />}></Route>
              </Route>

              <Route path='create-account' element={<CreateAccount />}></Route>
              <Route path='unauthorized' element={<Unauthorized />}></Route>

              {/* Rutas que pueden ser accedidas por el cliente "Customer" */}
              <Route path='account' element={<ProtectedRoute allowedRoles={["Customer"]} />}>
                <Route index element={<Account />}></Route>
                <Route path='payment-method' element={<AccountPaymentMethod />}></Route>
                <Route path='order-history' element={<OrderHistory />}></Route>
                <Route path='my-movies' element={<MoviesAccount />}></Route>
              </Route>

              {/* Paginas relacionadas al administrador */}
              <Route path='admin' element={<ProtectedRoute allowedRoles={["Administrator"]} />}>
                  <Route index element={<AdminDashboard />}></Route>
                  
                  {/* Pagina para manejar las peliculas */}
                  <Route path='movies' element={<Outlet />}>
                    <Route index element={<AdminMovies />}></Route>
                    <Route path='manage' element={<ManageMovies />}></Route>
                    <Route path='manage/:id' element={<ManageMovies />}></Route>
                  </Route>
                  {/* Pagina para manejar las comidas */}
                  <Route path='foods' element={<Outlet />}>
                    <Route index element={<AdminFoods />}></Route>
                    <Route path='manage' element={<ManageFoods />}></Route>
                    <Route path='manage/:id' element={<ManageFoods />}></Route>
                  </Route>
                  {/* Pagina para manejar las salas */}
                  <Route path='rooms' element={<Outlet />}>
                    <Route index element={<AdminRooms />}></Route>
                    <Route path='manage' element={<ManageRooms />}></Route>
                    <Route path='manage/:id' element={<ManageRooms />}></Route>
                  </Route>
                  {/* Pagina para manejar las cuentas */}
                  <Route path='accounts' element={<Outlet />}>
                    <Route index element={<AdminAccounts />}></Route>
                    <Route path='manage' element={<ManageAccount />}></Route>
                    <Route path='manage/:id' element={<ManageAccount />}></Route>
                  </Route>
                  <Route path='account'dex element={<AdminMyAccount />}></Route>
              </Route>
          </Route>
        </Routes>
      </UserProvider>
      </BrowserRouter>
    </>
  )
}