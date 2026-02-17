import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, Download, DownloadCloud, EyeIcon, EyeOffIcon, FileText, Folder, GraduationCap, Loader2, Plus, Save, Share2Icon, Sparkles, SquareKanban, UserIcon } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { Link, useParams } from 'react-router-dom';
import PersonalInfoForm from '../components/PersonalInfoForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';
import ProfessionalSummary from '../components/ProfessionalSummary';



import { useSelector } from 'react-redux';

import Loader from '../components/Loader.jsx';

import { Button } from '../components/Button.jsx';

import { FormSection } from '../components/form/FormSection.jsx';
import { educationFields, experienceFields, projectsFields, skillFields, } from '../../app/lib/data.js';

import toast from 'react-hot-toast';
import { useResumes } from '../../app/hooks/useResumes.js';




const ResumeBuilder=()=> {
  
  
  const {token}=useSelector(state=>state.auth);
 
  const {resumeId}=useParams();
  const {resume,isLoadingResume,update,isUpdating,enhanceSummary,isEnhancingSummary}=useResumes(token,resumeId)

 
  
  const contentRef = useRef(null);
  const [resumeData, setResumeData] = React.useState(
    {
     _id: '',
      title: '',
    personal_info: {
     
      full_name: '',
      image:'',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
    },
    professional_summary:'',
    education: [],
    experience: [],
    skills: [],
    project: [],
    template:"classic",
    accentColor:"#34D399",
    public:false
  });

  const [activeSectionIndex,setActiveSectionIndex]=React.useState(0);
  const [removeBackground,setRemoveBackground]=React.useState(false);
  const section=[
    {id:"personal",name:"Personal Info", icon:UserIcon},
    {id:"summary",name:"Summary", icon:FileText},
    {id:"experience",name:"Experience", icon:GraduationCap},
    {id:"education",name:"Education", icon:Briefcase},
    {id:"project",name:"Project", icon:Folder},
    {id:"skills",name:"Skills", icon:Sparkles},
   
  ]
 
  const activeSection=section[activeSectionIndex];

  const generateSummary=()=>{
    const prompt=`enhance my professional summary "${resumeData.professional_summary}"`
    enhanceSummary(prompt,
    {
       onSuccess:(data)=>{
        setResumeData(prev =>({...prev,professional_summary:data.enhanceContent}))
        toast.success("Enhance successfully")
    },
    onError:(error)=>{
        toast.error(error.message)
    },

    }
    )
  }

   

  const changeResumeVisiblity=async()=>{
    
   const newStatus=!resumeData.public

    update({
      resumeId:resumeId,
      resumeData:{public:newStatus}
    },{
      onSuccess:()=>{
        setResumeData(prev =>({...prev,public:newStatus}))
        toast.success('Upadated Successfully')
      },
      onError:(error)=>{
         toast.error(error.message)
      }

    })
  }

  const handleShare=()=>{
    const frontendUrl=window.location.href.split("/app")[0];
    const resumeUrl=frontendUrl + "/view/" + resumeId

    if(navigator.share){
      navigator.share({url:resumeUrl,text:"My Resume",})
    }else{
      alert("Share not supported on this browser.")
    }
  }

  const downloadResume=useReactToPrint({
   
    contentRef,
    documentTitle: "My_Resume",
  })


  const saveResume=async()=>{
    
    let updateResumeData=structuredClone(resumeData);

    if(typeof resumeData.personal_info.image ==='object'){
      delete updateResumeData.personal_info.image
    }
    const formData=new FormData();
    formData.append('resumeId',resumeId);
    formData.append('resumeData',JSON.stringify(updateResumeData))
    removeBackground && formData.append("removeBackground","yes");
    typeof resumeData.personal_info.image==='object' && formData.append('image',resumeData.personal_info.image)

    update(formData,{
      onSuccess:(data)=>{
        setResumeData(data)
       toast.success('Upadated Successfully')
      },onError:(error)=>{
        toast.error(error.message)
      }
    }

  )}
 
  useEffect(() => {
  if (resume && !resumeData._id) {
 
    const timer = setTimeout(() => {
      setResumeData(resume);

    }, 0);

    return () => clearTimeout(timer);
  }
}, [resume, resumeData._id]);
  if(isLoadingResume){
    <Loader/>
  }
  return (
    <div>
       <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
        <ArrowLeftIcon className='size-4'/> Back to Dashboard
        </Link>
       </div>

       <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className=' grid lg:grid-cols-12 gap-8'>
          {/* Left Side - Editor */}
          <div className=' relative lg:col-span-5 rounded-lg '>
            <div className=' bg-white rounded-lg shadow-sm border
             border-gray-200 p-6 pt-1'>
                  {/* progress bar using active section */}
             <hr className=' absolute top-0 right-0 border-2 w-full border-gray-200'/>
              <hr className=' absolute top-0 left-0 h-1 bg-linear-to-r from-green-500 to-green-600 border-none transition-all duration-2000'
              style={{width:`${activeSectionIndex * 100 / (section.length -1)}%`}}/>
                  {/* Section Navigation */}
                  <div className=' flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
                 
                   <div className='flex items-center gap-2'> 
                    <TemplateSelector 
                    selectTemplate={resumeData.template}
                    onChange={(template)=>setResumeData(prev =>({...prev,template}))}/>
                   <ColorPicker selectedColor={resumeData.accentColor}
                   onChange={(color)=>setResumeData(prev =>({...prev,accentColor:color}))}/>
                   </div>
                   <div className=' flex items-center'>
                    {activeSectionIndex !==0 &&(
                      
                      <Button 
                     type='button'
                     icon={ChevronLeft}
                     variant='ghost'
                     onClick={()=> {
                      setActiveSectionIndex((index)=> Math.max(0, index -1))
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                     }} 
                     disabled={activeSectionIndex===0}
                     className='gap-1 py-3 font-medium '
                    >
                        Previous
                    </Button>
                     
                    )}
                     <Button 
                     type='button'
                     icon={ChevronRight}
                     variant='ghost'
                     onClick={()=>{
                      setActiveSectionIndex((index)=> Math.min(section.length -1, index +1)) 
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                     }}
                     
                     disabled={activeSectionIndex===section.length -1} 
                     className={` flex-row-reverse gap-1 py-3 font-medium   ${activeSectionIndex===section.length -1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Next
                    </Button>
                     
                    
                   </div>
                  </div>
                  {/* Form Content */}
                  <div className='space-y-6'>
                    {activeSection.id ==='personal' && (
                      
                        <PersonalInfoForm data={resumeData.personal_info}
                        onChange={(newData)=>setResumeData(prev=>({...prev,personal_info:newData}))}
                        removeBackground={removeBackground}
                        setRemoveBackground={setRemoveBackground}
                        />
                   
                    )}

                    {activeSection.id ==='summary' && (
                      <ProfessionalSummary
                       data={resumeData.professional_summary}
                       onChange={(data)=>setResumeData(prev=>({...prev,professional_summary:data}))}
                       onClick={generateSummary}
                       isLoading={isEnhancingSummary} 
                       />
                    )}
                    {activeSection.id ==='experience' && (
                      <FormSection
                       data={resumeData.experience}
                       onChange={(data)=>setResumeData(prev=>({...prev,experience:data}))}
                       title={activeSection.name}
                       description="Add your work history"
                       btnLabel="Add Experience"
                       btnColor="green"
                       btnIcon={Plus}
                       sectionIcon={activeSection.icon}
                       items={experienceFields}
                       
                       />
                    )}

                    {activeSection.id ==='education' && (
                      <FormSection
                       data={resumeData.education}
                       onChange={(data)=>setResumeData(prev=>({...prev,education:data}))}
                       title={activeSection.name}
                       description="Add your eduction history"
                       btnLabel="Add Eduction"
                       btnColor="purple"
                       btnIcon={Plus}
                       sectionIcon={activeSection.icon}
                       items={educationFields}
                       />
                    )}

                    {activeSection.id ==='project' && (
                      <FormSection
                       data={resumeData.project}
                       onChange={(data)=>setResumeData(prev=>({...prev,project:data}))}
                       title={activeSection.name}
                       description="Add your project"
                       btnLabel="Add Project"
                       btnColor="blue"
                       btnIcon={Plus}
                       sectionIcon={activeSection.icon}
                       items={projectsFields}
                       />
                    )}

                    {activeSection.id ==='skills' && (
                      <FormSection
                       data={resumeData.skills}
                       onChange={(data)=>setResumeData(prev=>({...prev,skills:data}))}
                       title={activeSection.name}
                       description="Add your skills"
                       btnLabel="Add Skill"
                       btnColor="purple"
                       btnIcon={Plus}
                       sectionIcon={activeSection.icon}
                       items={skillFields}
                       />
                    )}

                  </div>
                   <Button 
                     type='button'
                     icon={Save}
                     variant='green'
                     onClick={saveResume} 
                     isLoading={isUpdating}
                     loadingTitle='Saving...'
                     className='mt-6 py-4'
                    >
                       Save Changes
                    </Button>
                  
            </div>

          </div>
          {/* Right Side - Preview */}
          <div className='lg:col-span-7 max-lg:mt-6'>
               <div className=' relative w-full'>
                 {/* buttons */}
                    <div className=' absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                      {resumeData.public && (
                        <Button 
                          icon={Share2Icon}
                          variant='blue'
                          onClick={handleShare} 
                           >
                          Share
                        </Button>
                       
                      )}
                       <Button 
                          icon={ resumeData.public ? Share2Icon : EyeOffIcon}
                          variant='purple'
                          onClick={changeResumeVisiblity} 
                           >
                         {resumeData.public ? "Public" : "Private"} 
                        </Button>
                       
                       <Button 
                          icon={Download}
                          variant='green'
                          onClick={downloadResume} 
                           >
                          Download
                        </Button>
                    </div>
                </div> 
                   {/* ---resume preview */}    
                   <ResumePreview ref={contentRef}   data={resumeData} template={resumeData.template} accentColor={resumeData.accentColor}/>
          </div>
        </div>
       </div>
    </div>
  )
}

export default ResumeBuilder