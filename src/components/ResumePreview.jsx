import ModernTemplate from '../assets/templates/ModernTemplate';
import MinimalTemplate from '../assets/templates/MinimalTemplate';
import MinimalImageTemplate from '../assets/templates/MinimalImageTemplate';
import ClassicTemplate from '../assets/templates/ClassicTemplate';
const ResumePreview = ({data,template,accentColor,classes="",ref}) => {

    const renderTemplate=()=>{
        switch(template){
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor} />;
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor} />;
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor} />;
            default:   
                return <ClassicTemplate data={data} accentColor={accentColor} />; 
        }
    }
  return (
    <div className='w-full bg-gray-100'>
        <div
        ref={ref}
         id="resume-preview" className={"border border-gray-200 print:shadow-none print:border-none " + classes}>
            {renderTemplate()}
        </div>
      
        
    </div>
  )
}

export default ResumePreview