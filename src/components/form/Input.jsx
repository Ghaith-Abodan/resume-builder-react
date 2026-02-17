


export const Input = ({ label,inputIcon:Icon, value, onChange, placeholder, type = 'text', className = '', ...props }) => {
  
    if(type==='checkbox'){
        return(

       
         <label className='flex items-center gap-1 cursor-pointer col-span-2'>
             <input type='checkbox' 
                   value={!!value}
                    onChange={onChange}
                    className={`rounded border-gray-300 text-green-600 focus:ring-green-500 in-checked:bg-green-600 ${className} `}
                    {...props}
                    />
            
            <span className='text-sm text-gray-700'> {label}</span>

         </label>
          )
    }

    return(
       <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="flex items-center gap-2 font-medium text-gray-600">
              {Icon && (
                  <Icon className='size-4'/>
              )}
              {label}
              {props.required && <span className="text-red-500">*</span>}
            </label>
      )
       }
      <input
        placeholder={placeholder}
        type={type}
        value={value || ""}
        onChange={onChange}
        className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none"
        {...props}
      />
    </div> 
    )
    
};