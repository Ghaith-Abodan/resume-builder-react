import { Check, Layout } from 'lucide-react';
import React from 'react'
import { Button } from './Button';

const TemplateSelector = ({selectTemplate,onChange}) => {

    const [isOpen,setIsOpen]=React.useState(false);

    const templates=[
        {
            id:"classic",
            name:"Classic",
            preview:"A clean, traditional resume format with clear sections and professional typography."
        },
           {
            id:"modern",
            name:"Modern",
            preview:"A sleek, design with strategic use of color and modern font choice."
        },
           {
            id:"minimal-image",
            name:"Minimal Image",
            preview:"A minimalist resume style that incorporates a profile image for a personal touch."
        },
        {
            id:"minimal",
            name:"Minimal",
            preview:"A simple, elegant resume format with ample white space and understated design elements."
        }
    ]
  return (
    <div className=' relative'>
         <Button 
            type='button'
            icon={Layout}
            variant='blue'
            onClick={()=>setIsOpen(!isOpen)} 
       
            >
            Template
        </Button>
       
        {isOpen &&(
            <div className=' absolute top-full w-xs p-3 mt-2 z-10 bg-white
            rounded-md border border-gray-200 shadow-sm space-y-3 '>
                {templates.map((template)=>(
                    <div key={template.id}
                    onClick={()=>{onChange(template.id);setIsOpen(false)}}
                    className={`relative p-3 border rounded-md cursor-pointer transition-all
                     ${selectTemplate===template.id ? 'border-blue-400 bg-blue-100'
                     :'border-gray-300 hover:border-gray-400 hover:bg-gray-100'}`}>
                       {selectTemplate===template.id &&(
                        <div className=' absolute top-2 right-2'>
                            <div className=' size-5 bg-blue-400 rounded-full flex items-center justify-center'>
                                <Check className='w-3 h-3 text-white'/>
                            </div>
                        </div>
                       )}
                       <div className='space-y-1'>
                        <h4 className='font-medium text-gray-800'>{template.name}</h4>
                        <p className='text-xs text-gray-600 bg-blue-50 px-2 py-1.5 '>
                            {template.preview}
                         </p>
                       </div>
                    </div>
                ))}
            </div>
        )}

    </div>
  )
}

export default TemplateSelector