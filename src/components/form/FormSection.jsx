
import {  Sparkles, Trash2Icon } from "lucide-react";
import { Button } from "../Button"
import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { Header } from "./Header";
import { useFormActions } from "../../../app/hooks/useFormActions";
import { Select } from "./Select";

import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useResumes } from "../../../app/hooks/useResumes";


export const FormSection=({
    title,
    description,
    btnColor,
    btnLabel,
    btnIcon:BtnIcon,
    sectionIcon:SectionIcon,
    data,
    onChange,
    items,
   
})=>{
   
   const {token}=useSelector(state=>state.auth); 
   const [genratingIndex,setGeneratingIndex]=useState(-1) 
   const {addItem,removeItem,updateItem}=useFormActions(data,onChange,items)
 
   const {enhanceContent,isEnhancingContent}=useResumes(token) 
  
  
   const generateJobDescription=(index,fieldName)=>{
    
 
    setGeneratingIndex(index)
    const currentItem=data[index]
    
    let prompt = "";
    if(title.toLowerCase().includes("experience")){
    prompt=`enhance my job description ${currentItem.description} for the position of 
    ${currentItem.position} at ${currentItem.company}`
    }else if (title.toLowerCase().includes("project")) {
    prompt = `Enhance this project description: "${currentItem.description}" for the project named ${currentItem.name}. `;
  }
   
    enhanceContent(prompt,
    {
    onSuccess:(data)=>{
     
        updateItem(index,fieldName,data?.enhancedContent)
        setGeneratingIndex(-1)
        toast.success("Enhance successfully")
        
        
    },
    onError:(error)=>{
        toast.error(error.message)
    },
       
    }
    )
  }
  const checkIsDisabled = (index,item,genratingIndex)=>{

    const isExperience = title?.toLowerCase().includes("experience");
    const isProject=title?.toLowerCase().includes("project");
    const isGenerating = genratingIndex === index;
    if(isExperience){
    
        return isGenerating || !item.position || !item.company || !item.description;
        
    }
    if(isProject){
        return isGenerating || !item.name || !item.description
     
    }
   return false
  }

    
   return(
         <div className='space-y-6'>
                    {/*Header*/}
                     <div className='flex items-center justify-between'>
                              <Header
                              title={title}
                              description={description}
                        />
                       
                       <Button
                        variant={btnColor}
                        icon={BtnIcon}
                        onClick={addItem}
                        type="button"

                       >
                        {btnLabel}
                       </Button>
                    </div>
                     {/*anther components */}
                     {data.length===0 ?(
                         <div className=' text-center py-8 text-gray-500'>
                         {SectionIcon && <SectionIcon className='w-12 h-12 mx-auto mb-3 text-gray-300'/>}
                        <p>No {title.toLowerCase()} added yet</p>
                        <p className='text-sm'>Click Add {title.toLowerCase()} to get started</p>
                        </div>
                  
                     ):(
                    <div className='space-y-4'>
    
    
                 {data.map((item,index)=>(
                <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                <div className='flex justify-between items-start'>
                 <h4>{title} # {index + 1}</h4>
                     <button onClick={()=>removeItem(index)}
                             className='text-red-500 hover:text-red-700 transition-colors'   >
                            <Trash2Icon className='size-4'/> 
                    </button>
                        </div>
                     
                       <div className="grid grid-cols-2 gap-5">
                     {items && (
                          items.map((field)=>{
                            const isDisabled = checkIsDisabled(index, item, genratingIndex);
                            if(field?.type ==='text' || field?.type=== 'checkbox' || field?.type=== 'month'){
                           
                                return(
                                <Input
                                    key={field.name}
                                    {...field}
                                    value={item[field.name]}
                                    onChange={field.type==="checkbox" ?(e)=>updateItem(index,field.name,e.target.checked) :(e)=>updateItem(index,field.name,e.target.value)}
                                    placeholder={field.placeholder}
                                    className={field.fullWidth ? "col-span-2" : "col-span-1"}
                                    checked={item[field.name] || false}  
                                
                                />
                             
                                   
                               )}  
                            
                            if(field?.type==='textarea'){
                                return(
                                <div
                                key={field.name} 
                                className="col-span-2 space-y-2">
                                <div
                               
                                className=' flex items-center justify-between col-span-2'>
                                <h3 className=' font-medium  text-gray-600'>{field.label}</h3> 
                            
                                <Button
                                variant='purple'
                                icon={Sparkles}
                                onClick={()=>generateJobDescription(index,field.name)}
                                type='button'
                                isLoading={isEnhancingContent}
                                disabled={isDisabled}        
                                loadingTitle="Enhancing..."
                                >
                                AI Enhance
                                </Button>
                                
                                
                                </div>
                                <TextArea
                                value={item[field.name]}
                                placeholder={field.placeholder}
                                onChange={(e)=>updateItem(index,field.name,e.target.value)}
                                className="col-span-2"
                                />
                             </div>
                               
                            )} 

                            if(field?.type ==='select'){
                                return(
                                  <Select
                                    key={field.name}
                                    value={item[field.name]}
                                    placeholder={field.placeholder}
                                    onChange={(e)=>updateItem(index,field.name,e.target.value)}
                                    options={["Beginner","Intermediate","Expert"]}
                                  
                                  />  
                                )
                            }
                                
                            })
                            
                         
                        )}
                      
                      </div>
                      </div>  
                     ))}
             
               
                     </div>
                     )}
                </div>  
    )
}