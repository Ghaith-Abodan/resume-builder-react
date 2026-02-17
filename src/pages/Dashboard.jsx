import { PlusIcon, UploadCloud } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


import pdfToText from 'react-pdftotext'
import Loader from '../components/Loader';
import { ResumeCard } from '../components/ResumeCard.jsx';
import { useResumes } from '../../app/hooks/useResumes.js';
import { ModalForm } from '../components/form/ModalForm.jsx';

import toast from 'react-hot-toast';
import { Input } from '../components/form/Input.jsx';


const Dashboard = () => {

  const {token}=useSelector(state=>state.auth);

  const navigate=useNavigate();
  
  const [modalType,setModalType]=useState(null);
 
  

  const [resumeId,setResumeId] = React.useState("");
  const [title,setTitle] = React.useState("");
  const [resume,setResume] = React.useState(null);

  const {resumes,isLoading,create,isCreating,remove,isDeleting,upload,isUploading,update,isUpdating}=useResumes(token)
  

  const close=()=>{
    setModalType(null);
    setTitle("")
    
  }
    const createResume=async(e)=>{
      
        e.preventDefault();
     
       
        create({title},{
        onSuccess:(resume)=>{
          
        navigate(`/app/builder/${resume._id}`);
        setTitle('');  
        toast.success("Creating successfully")
      },
      onError:(error)=>{
        toast.error(error.message)
       
      }
      
    })

    }
    const UploadResume=async(e)=>{
        e.preventDefault();
        const resumeText=await pdfToText(resume)
          upload({title,resumeText},{
          onSuccess:(resumeId)=>{
            console.log(resume)
          setTitle('');
          setResume('');
          toast.success("Uploading successfully")
          navigate(`/app/builder/${resumeId}`);

          },
           onError:(error)=>{
          toast.error(error.message)
       
        }
        })

          
        
      
    }
    const deleteResume=async(e,resumeId)=>{
        e.preventDefault();
        remove(resumeId,
        {
          onSuccess:async()=>{
          
         toast.success("Deleted successfully") 
              
          },
        onError:(error)=>{
        toast.error(error.message)
        
      }
        })
  
    }

    const editTitle=async(e)=>{
      e.preventDefault();
    
      update({
        
        resumeId:resumeId,
        resumeData:{title:title}
      },
      {
       onSuccess:(resume)=>{
     
        navigate(`/app/builder/${resume?._id}`);
        setTitle('');
        toast.success("Updating successfully")
      },
      onError:(error)=>{
        toast.error(error.message)
        
      }})
  
    }

   

   
  return (
    <div>
        <div className=' max-w-7xl mx-auto px-4 py-8'>
          <p className=' text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome, Joe Doe</p>
          <div className=' flex gap-4 '>
            <button onClick={()=>setModalType('create')} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer '>
              <PlusIcon className='size-11 transition-all duration-300 p-2.5 
              bg-linear-to-br from-green-300 to-green-500 text-white rounded-full'/>
              <p className='text-sm group-hover:text-green-600 transition-all duration-300'>Create Resume</p>
            </button>

            <button onClick={()=>setModalType('upload')} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-yellow-500 hover:shadow-lg transition-all duration-300 cursor-pointer '>
              <UploadCloud className='size-11 transition-all duration-300 p-2.5 
              bg-linear-to-br from-yellow-300 to-yellow-500 text-white rounded-full'/>
              <p className='text-sm group-hover:text-yellow-600 transition-all duration-300'>Upload Existing </p>
            </button>
          </div>
          <hr className='border-slate-300 my-6 sm:w-76'/>

          <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
            {isLoading && (
             
                <Loader/>
           
            )}
            { resumes?.length > 0 &&
            ( resumes.map((resume,index)=>(
            
            
              <ResumeCard
               key={index}
               index={index}
               resume={resume}
               deleteResume={(e,id)=>deleteResume(e,id)}
               setModalType={setModalType}
               setTitle={setTitle}
               setResumeId={(id)=>setResumeId(id)}
               isLoading={isDeleting}
              />
              )))
           
            }

          </div>

          {modalType ==='create' && (
            <ModalForm
            title="Create a resume"
            submit={createResume}
            isLoading={isCreating}
            close={close}
            btnLabel="Create"
            >

             <Input
              onChange={(e)=>setTitle(e.target.value)} 
              value={title}
              type="text" 
              placeholder='Resume Title'
              required
             />
            </ModalForm>
         
          )}

          {modalType ==='upload' && (
            <ModalForm
            title="Uplaod a Resume"
            submit={UploadResume}
            isLoading={isUploading}
            close={close}
            btnLabel="Uplaod"
            >
             <Input
             onChange={(e)=>setTitle(e.target.value)}
             value={title}
             type="text" 
             placeholder='Resume Title'
             required
             /> 
      
             <div className='mt-2'>
               <label htmlFor='resume-input' className=' block text-sm text-slate-700'>
                    Select resume file
                    <div className=' flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'>
                      {resume ? (
                        <p className=' text-sm text-green-700'>{resume.name}</p>
                      ) : (
                        <>
                        <UploadCloud className=' size-14 stroke-1'/>
                        <p>Upload resume</p>
                        </>
                      )}
                    </div>
                  </label>
                  <input id='resume-input' type="file" accept=".pdf" className=' hidden'
                  onChange={(e)=>setResume(e.target.files[0])} required/>
                </div>
              
            </ModalForm>
           
          )}

           {modalType ==='update' && (
            <ModalForm
            title="Update Title"
            submit={editTitle}
            isLoading={isUpdating}
            close={close}
            btnLabel="Update"
            >

             <Input
              onChange={(e)=>setTitle(e.target.value)} 
              value={title}
              type="text" 
              placeholder='Resume Title'
              required/>  
            </ModalForm>
         
          )}

        </div>
    </div>
  )
}

export default Dashboard