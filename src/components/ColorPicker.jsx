import { Check, Palette } from 'lucide-react';
import React from 'react'
import { Button } from './Button';

const ColorPicker = ({selectedColor,onChange}) => {

    const colors=[
        {id:"Red",value:"#EF4444"},
        {id:"Green",value:"#10B981"},
        {id:"Blue",value:"#3B82F6"},
        {id:"Yellow",value:"#FBBF24"},
        {id:"Purple",value:"#8B5CF6"},
        {id:"pink",value:"#Ec4899"},
        {id:"indigo",value:"#818CF8"},
        {id:"Teal",value:"#14B8A6"},
        {id:"Orange",value:"#F97316"},    
        {id:"Black",value:"#1F2937"},
    ]

    const [isOpen,setIsOpen]=React.useState(false);
    
  return (
    <div className=' relative'>
          <Button 
            type='button'
            icon={Palette}
            variant='purple'
            onClick={()=>setIsOpen(!isOpen)} 

            >
             Accent
            </Button>
       
        {isOpen &&(
            <div className=' absolute top-full left-0 right-0 w-60 grid grid-cols-4 p-3 mt-2 z-10 bg-white
            rounded-md border border-gray-200 shadow-sm gap-2'>
                {colors.map((color)=>(
                    <div key={color.id}
                        className="relative cursor-pointer group flex flex-col "
                        onClick={()=>{onChange(color.value)}}>
                    <div className=' w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-all'
                    style={{backgroundColor:color.value}}>

                    </div>
                    {selectedColor === color.value &&(
                        <div className=' absolute top-0 left-0 right-0 bottom-4.5 flex items-center justify-center'>
                            <Check className=' size-5 text-white'/>
                        </div>
                    )}

                    <p className='text-xs text-center mt-1 text-gray-600'>{color.id}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default ColorPicker