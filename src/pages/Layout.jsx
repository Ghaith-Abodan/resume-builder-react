
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import Login from './Login'

const Layout=()=> {

 const {token}=useSelector((state)=>state.auth)

 if(!token){
  return <Login/>
 }
  
  return (
    <div> 
        <Navbar />
        <Outlet />
        
        </div>
  )
}

export default Layout