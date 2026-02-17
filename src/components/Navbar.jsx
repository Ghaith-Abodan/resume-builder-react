import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { logout } from "../../app/features/authSlice";

const Navbar = () => {
    const dispatch=useDispatch();

    const {user}=useSelector((state)=>state.auth)
    const navigate=useNavigate();
    const logoutUser=()=>{
        navigate('/');
        dispatch(logout());

    }
  return (
    <div className=' shadow bg-white '>
        <nav className='flex items-center justify-between py-3.5 px-4 max-w-7xl mx-auto
        text-slate-800 transition-all'>
            <Link to="/">
                <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
            </Link>
            <div className='flex items-center space-x-4 text-sm'>
                <h3 className=' max-sm:hidden font-medium text-green-500'>Welcome <span className=" text-black">{user.name}</span></h3>
                <button onClick={logoutUser} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
            </div>
            </nav>
    </div>
  )
}

export default Navbar