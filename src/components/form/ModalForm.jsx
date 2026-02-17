import { Loader, UploadCloud, XIcon } from "lucide-react";
import { Button } from "../Button";



export const ModalForm=({
    submit,
    close,
    title,
    isLoading,
    btnLabel,children

})=>{
    
   
   
    return(
        <div
         className=' fixed inset-0 bg-black/70 backdrop:backdrop-blur z-10 flex items-center justify-center'
         onClick={close}
         >

     
         <form onSubmit={submit} 
               onClick={(e)=>e.stopPropagation()} 
               className="relative bg-white/90 shadow-xl rounded-xl w-full max-w-sm p-8 flex flex-col gap-2">
             
                <h2 className='text-2xl font-bold mb-4 text-slate-800'>{title}</h2>
                
                <div className="mb-4">
                    {children}
                </div>
                <div className="flex gap-3">
                  <Button
                   variant="red"
                   type="button"
                   onClick={close}
                   className="w-full flex items-center justify-center"
                   >
                    Cancel
                 </Button>  

                 <Button
                  variant="green"
                  disabled={isLoading}
                  type="submit"
                  className="w-full flex items-center justify-center"
                  isLoading={isLoading}
                  loadingTitle="Processing"
                  >
                    {btnLabel}
                 </Button>
                </div>
                 <XIcon onClick={close} 
                        className=' absolute top-4 right-4 text-slate-400 hover:bg-slate-200 cursor-pointer transition-colors'/>
            
            </form>   
               </div> 
    )
}