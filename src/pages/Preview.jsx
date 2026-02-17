import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview';
import Loader from '../components/Loader';
import { ArrowLeftIcon } from 'lucide-react';

const Preview=({data})=> {

  const {resumeId}=useParams();
  const [isLoading,setIsLoading]=useState(true)
  const [resumeData,setResumeData]=useState(data || null)

 
  useEffect(()=>{
    const loadResume=async()=>{
    setResumeData(data.find(resume=> resume._id === resumeId || null))
    setIsLoading(false)
 }
  loadResume();

  console.log(isLoading)
  },[])
  return resumeData ? (
     <div className=' bg-slate-100'>
       <div>
        <ResumePreview data={resumeData} 
        template={resumeData.template}
         accentColor={resumeData.accent_color}
         classes='py-4 bg-white'/>
       </div>
    </div>
      
   
    ):(
      <div>
        {isLoading ? <Loader/> 
        :(
          <div className='flex flex-col items-center justify-center h-screen'>
            <p>Reume not found</p>
            <a href='/' 
             className=' mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors'>
            <ArrowLeftIcon className='mr-2 size-4'/>
             go to home page
            </a>
            </div>
        )}
      </div>
    )

   
  
}

export default Preview