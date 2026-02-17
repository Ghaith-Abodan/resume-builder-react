

export const useFormActions=(data,onChange,fieldsConfig)=>{

    const addItem=()=>{
         const emptyEntry=fieldsConfig.reduce((acc,field)=>({...acc,[field.name]:""}),{})
       
        onChange([...data,emptyEntry])
    }

    const removeItem=(index)=>{
        const updatedItem=data.filter((_,i)=>i!==index);
        onChange (updatedItem);
    }

    const updateItem=(index,field,value)=>{
        const updated=[...data];
        updated[index]={...updated[index],[field]:value};

        onChange (updated);
    }
    
    return {addItem,removeItem,updateItem}
}