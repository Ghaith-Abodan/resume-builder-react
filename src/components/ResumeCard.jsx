import { Accessibility, Check, CheckCircle, CheckLine, CheckSquare, FilePenLineIcon, Loader, PencilIcon, TrashIcon, X, XSquareIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export const ResumeCard=({ resume,index, deleteResume, setModalType ,setResumeId,setTitle ,isLoading })=>{

 
  const [deleteMessageShow,setDeleteMessageShow]=useState(false);
  
    const navigate=useNavigate();
    const colors=["#F87171","#34D399","#60A5FA","#FBBF24","#A78BFA"];
    const baseColor=colors[index % colors.length];
    
     return (
         <div  onClick={()=>{
          if(!deleteMessageShow) {
            navigate(`/app/builder/${resume._id}`)
          }}} 
          className={`relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2  ${!deleteMessageShow && 'group hover:shadow-lg transition-all duration-300 cursor-pointer'}`} 
                style={{background:`linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,borderColor:baseColor + '40'}}>
                  
                  {deleteMessageShow ? (
                    <div className=" flex flex-col gap-4">
                      <h3 className='text-sm font-normal text-slate-600 px-2 text-center'>
                        do want this resume delete ? 
                      </h3>
                      <div className=" flex items-center justify-center gap-4">
                       {isLoading && <Loader className=' animate-spin' size={18}/>}
                      
                        <Check 
                        type="button"
                        onClick={(e)=>{
                          setDeleteMessageShow(false)
                          deleteResume(e,resume._id)
                        }} 
                        
                        className="w-6 h-6 bg-transparent hover:bg-white/50   text-red-500 cursor-pointer"/>
                        <X onClick={()=>setDeleteMessageShow(false)} className="w-6 h-6 bg-transparent hover:bg-white/50 text-green-500 cursor-pointer"/>
                      </div>
                    </div>
                  )
                  :(
                    <div className="flex flex-col items-center">
                    <FilePenLineIcon className=' size-7 group-hover:scale-105 transition-all'
                  style={{color:baseColor}}/>
                     <p className='text-sm group-hover:scale-105 transition-all px-2 text-center'
                  style={{color:baseColor}}>
                    {resume.title}
                    </p>
                  <p className=' absolute bottom-1 text-xs text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center '
                  style={{color:baseColor + '90'}}>
                    Updated on: {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>  
                     <div className=' absolute top-1 right-1 group-hover:flex items-center hidden'>
                    <TrashIcon onClick={(e)=>{
                      e.stopPropagation();
                      setDeleteMessageShow(true)
                    }} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
                    <PencilIcon onClick={(e)=>{e.stopPropagation();setModalType('update');setResumeId(resume._id);setTitle(resume.title)}} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
                    </div>  
                    </div>
                  )}
                 
                 
                </div>
    )
}