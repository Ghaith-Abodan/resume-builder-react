import { User } from 'lucide-react'
import { personalfields } from '../../app/lib/data';
import { Input } from './form/Input';
import { Header } from './form/Header';

const PersonalInfoForm = ({data,onChange,removeBackground,setRemoveBackground}) => {
  
  const handleChange=(field,value,maxLength)=>{
   if (maxLength && value.length > maxLength) {
    return; 
  }
    onChange({...data,[field]:value})
  }
 
  return (
    <div className='space-y-6'>
      <Header
      title="Personal Information"
      description="Get Started with the personal information"
      />
       
        <div className=' flex items-center gap-2'>
            <label>
                {data.image ?(
                    <img src={typeof data.image ==='string' ? data.image :URL.createObjectURL(data.image)} alt="Profile" className=' w-16 h-16 object-cover rounded-full mt-5 ring ring-slate-300 hover:opacity-80'/>
                ):(
                    <div className=' inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer'>
                    <User className=' size-10 p-2.5 border rounded-full'/>
                    upload user image
                    </div>
                   
                )}
                <input
                 type="file" accept='image/jpeg, image/png' 
                 className=' hidden '
                 onChange={(e)=>handleChange("image",e.target.files[0])}/>
            </label>
                {typeof data.image ==='object' && (
                    <div className='flex flex-col gap-1 pl-4 text-sm'>
                        <p>Remove Background</p>
                        <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                            <input type="checkbox" className='sr-only peer' onChange={()=>setRemoveBackground(prev =>!prev)} checked={removeBackground}/>
                            <div className='w-9 h-5 bg-slate-300 peer-checked:bg-green-600 rounded-full peer transition-colors duration-200 '></div>
                             <span className='w-3 h-3 bg-white absolute left-1 top-1 peer-checked:translate-x-4 ease-in-out rounded-full peer transition-transform duration-200 '></span>
                        </label>
                    
                    </div>
                )}
        </div>
        {personalfields.map((field)=> {
        const Icon=field.icon;
        return (
          <div key={field.name} className="space-y-1 mt-5">
          <Input
           label={field.label}
           inputIcon={Icon}
           required={field.required}
           type={field.type}
                value={data[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value,field.maxLength)}
                placeholder={`Enter your ${field.label.toLocaleLowerCase()}`}
                maxLength={field.maxLength}
          />
        
          
          
          </div>
        );
      })}
    </div>
  )
}

export default PersonalInfoForm