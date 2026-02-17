import { Sparkles } from 'lucide-react'
import React from 'react'
import { Button } from './Button'
import { Header } from './form/Header'
import { TextArea } from './form/TextArea'



const ProfessionalSummary = ({data,onChange,onClick,isLoading}) => {
  return (
     
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
      <Header
          title="Professional Summary"
          description="Add summary for your resume here"
          />
         <Button 
          icon={Sparkles}
          variant='purple'
          onClick={onClick}
          isLoading={isLoading}
          loadingTitle='Enhancing...'
          disabled={isLoading}
          >
              AI Enhance
          </Button>
         </div> 

        <div className='mt-6'>
         <TextArea
            value={data || ''}
            onChange={(e)=>onChange(e.target.value)}
            placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...'
            rows={7}
         />
           
            <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>
                Keep it concise (3-4 sentences) and focus on your most relevant skills and experiences.
            </p>
            </div> 
  
   
    </div>
  )
}

export default ProfessionalSummary