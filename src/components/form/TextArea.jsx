export const TextArea=({
placeholder,
onChange,
value,
className,
...props
})=>{
return (
         <textarea
        placeholder={placeholder}
        onChange={onChange}
        value={value ||""}
        className={`w-full py-2 px-3 text-sm resize-none rounded-lg border border-gray-300 focus:ring focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${className}`}
         rows={5}
        {...props}
       
        />
      
)
}