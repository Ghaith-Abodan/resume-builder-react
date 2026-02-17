

export const Select=({
value,
onChange,
options,
placeholder,
className = '',
...props
})=>{
    return(
      <select
      
      value={value || ""}
      onChange={onChange}
      className={`px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none ${className}`}
      {...props}
      >
        <option value="" disabled hidden>{placeholder}</option>
       {options?.map((option,index)=>(
        <option key={index} value={option}>{option}</option>
       ))}
      </select>  
    )
}