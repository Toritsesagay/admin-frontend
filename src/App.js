import React, { useEffect, Suspense } from "react"
import { Route, Routes } from 'react-router-dom'
import './App.css'
//importing redux action to log user in initially
import { checkIfAdminIsLoggedIn } from "./store/action/userAppStorage";
import { useDispatch } from "react-redux";
import FallBackComponent from './component/general/Fallback'
import { useSelector } from "react-redux";


{/*Admin dashbaoard section*/ }
const AdminLogin = React.lazy(() => import('./screen/admin_screen/Auth/Login'))

const AdminSignup = React.lazy(() => import('./screen/admin_screen/Auth/Signup'))

const AdminUsers = React.lazy(() => import('./screen/admin_screen/Dashboard/Users'))


const AdminEditUser = React.lazy(() => import('./screen/admin_screen/Dashboard/EditUser'))


const UserTransfer = React.lazy(() => import('./screen/admin_screen/Dashboard/UserTransfer'))
const Transfer = React.lazy(() => import('./screen/admin_screen/Dashboard/Transfer'))
const EditTransfer = React.lazy(() => import('./screen/admin_screen/Dashboard/EditTransfer'))


const UserDeposit = React.lazy(() => import('./screen/admin_screen/Dashboard/UserDeposits'))
const Deposit = React.lazy(() => import('./screen/admin_screen/Dashboard/Deposit'))
const EditDeposit = React.lazy(() => import('./screen/admin_screen/Dashboard/EditDeposit'))

const UserWithdraw = React.lazy(() => import('./screen/admin_screen/Dashboard/UserWithdraw'))
const Withdraw = React.lazy(() => import('./screen/admin_screen/Dashboard/Withdraw'))
const EditWithdraw = React.lazy(() => import('./screen/admin_screen/Dashboard/EditWithdraw'))


const Admin = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditAdmin'))


function App() {
  let dispatch = useDispatch()
  let { adminToken } = useSelector(state => state.userAuth)

  useEffect(async () => {
    await dispatch(checkIfAdminIsLoggedIn())
  }, [])


  return (
    <div className="App">
      <Suspense fallback={<FallBackComponent />}>
        <Routes>
          {/*the general routes */}
          <Route path='/' element={<AdminLogin />} />

          <Route path='/adminlogin' element={<AdminLogin />} />
          {/* the Admin  DASHBOARD routes*/}

          <Route path='/adminsignup' element={<AdminSignup />} />

          <Route path='/users' element={adminToken ? <AdminUsers status={false} /> : <AdminLogin />} />

          <Route path='/users/:id' element={adminToken ? <AdminEditUser status={true} /> : <AdminLogin />} />

          <Route path='/user-transfers' element={adminToken ? <UserTransfer status={true} /> : <AdminLogin />} />
        
          <Route path='/transfers/:user' element={adminToken ? <Transfer status={true} /> : <AdminLogin />} />
          <Route path='/transfers/:user/:id' element={adminToken ? <EditTransfer status={true} /> : <AdminLogin />} />



          <Route path='/user-deposits' element={adminToken ? <UserDeposit status={true} /> : <AdminLogin />} />
          <Route path='/deposits/:user' element={adminToken ? <Deposit status={true} /> : <AdminLogin />} />
          <Route path='/deposits/:user/:id' element={adminToken ? <EditDeposit status={true} /> : <AdminLogin />} />

          <Route path='/user-withdraws' element={adminToken ? <UserWithdraw status={true} /> : <AdminLogin />} />
          <Route path='/withdraws' element={adminToken ? <Withdraw status={true} /> : <AdminLogin />} />
          <Route path='/withdraws/:id' element={adminToken ? <EditWithdraw status={true} /> : <AdminLogin />} />

          <Route path='/Admin' element={adminToken ? <Admin status={true} /> : <Admin />} />
        </Routes>


      </Suspense>
    </div>

  );
}

export default App;
