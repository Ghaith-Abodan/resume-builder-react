import React from 'react'

import { Loader2 } from 'lucide-react';
import { useAuth } from '../../app/hooks/useAuth';

const Login=()=> {
     const queryParams = new URLSearchParams(window.location.search);
    const urlState=queryParams.get('state');
    const [state,setState]=React.useState(urlState || "login")

    const {mutate, isPending}=useAuth(state);
    

   
    

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    });

    const toggleState = () => {
        setState(prev => prev === "login" ? "register" : "login");
        setFormData({ name: '', email: '', password: '' });
    };
    const handleSubmit=async(e)=>{
      
        e.preventDefault();
        mutate(formData)
        
    }

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData(prevData=>({
            ...prevData,
            [name]:value
        }))
    }

    
  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="flex w-full space-y-4 flex-col max-w-96 bg-white p-8 rounded-2xl shadow-md">
        
                <a href="/" className="mb-8" title="Go to Home">
                    <img src='/logo.svg' alt='logo' className='h-8 w-auto' />
                </a>
        
                <h2 className="text-4xl font-medium text-gray-900">{state==="login" ? "Sign in" : "Sign up"}</h2>
        
                <p className=" text-base text-gray-500/90">
                    Please {state} to continue.
                </p>
                 {state !== "login" && (
                
                       
                        <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-green-600 outline-none px-3 py-3 w-full" 
                        value={formData.name} onChange={handleChange} required />
                   
                )}
              
                  
                    <input
                        placeholder="Email"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-green-600 outline-none px-3 py-3 w-full"
                        required
                        type="email"
                        name="email"
                        value={formData.email} onChange={handleChange} />
           
        
              
                 
                    <input
                        placeholder="Password"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-green-600 outline-none px-3 py-3 w-full"
                        required
                        type="password"
                        name="password"
                         value={formData.password} onChange={handleChange}  />
                    
             
        
                <button
                    type="submit"
                    className=" mt-4 py-3 w-full cursor-pointer rounded-full bg-green-600 text-white transition hover:bg-green-700"
                    disabled={isPending}
                    
                >
                    { isPending ? <Loader2 className=' animate-spin h-5 w-5'/> : state === "login" ? "Login" : "Sign up"  }
                </button>

                    <div className="text-center mt-4">
                    <button 
                        type="button" 
                        onClick={toggleState} 
                        className="text-gray-500 text-sm hover:text-gray-700 transition"
                    >
                        {state === "login" ? "Don't have an account?" : "Already have an account?"} 
                        <span className="text-green-600 font-semibold ml-1 underline-offset-4 hover:underline">
                            {state === "login" ? "Sign up" : "Sign in"}
                        </span>
                    </button>
                </div>
              
            </form>
        </div>
  )
}

export default Login