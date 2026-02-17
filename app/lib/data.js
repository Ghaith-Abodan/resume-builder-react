import { Globe, Linkedin, Mail, MapPin, Phone, User } from "lucide-react";

 export const personalfields=[
    
    {name:"full_name", label:"Full Name",icon:User,type:"text",required:true},
    {name:"email", label:"Email Address",icon:Mail,type:"email",required:true},
    {name:"phone",label:"Phone Number",icon:Phone,type:"number" ,maxLength:11},
    {name:"location",label:"Address",icon:MapPin,type:"text"},
    {name:"linkedin",label:"LinkedIn Profile",icon:Linkedin,type:"url"},
    {name:"website",label:"Personal Website",icon:Globe,type:"url"},
  ]  
export const experienceFields = [
  { name: "company", placeholder: "Company Name", type: "text" },
  { name: "position", placeholder: "PositionJob Title", type: "text" },
  { name: "start_date", placeholder: "Field of Study", type: "month" },
  { name: "end_date", placeholder: "Graduation Date", type: "month" },
  { name: "is_current", label:"Is_current", type: "checkbox"},
  { name: "description", label:"Job Description", placeholder:"Describe your key responsibilities and achievements..." ,type: "textarea"},
 
  
];

export const educationFields = [
  { name: "institution", placeholder: "Institution Name", type: "text", },
  { name: "degree", placeholder: "Degree (e.g., B.Sc)", type: "text" },
  { name: "field", placeholder: "Field of Study", type: "text" },
  { name: "graduation_date", placeholder: "Graduation Date", type: "month"},
  { name: "gpa", placeholder: "GPA (optional)", type: "text" },
]; 

export const projectsFields = [
        { name: "name", placeholder: "Project Name", type: "text", },
        { name: "description",placeholder:"Decribe your project...", label: "Prject Description", type: "textarea" },
       
        ];
export const skillFields = [
        { name: "name", placeholder: "Skill Name", type: "text", },
        { name: "level",placeholder:"Select your level...", type: "select" },
       
        ]; 
        
        
     
export const getLevelSpecs = (levelString) => {
  switch (levelString) {
    case 'Beginner':
      return { width: '33%', color: 'bg-red-400' };
    case 'Intermediate':
      return { width: '66%', color: 'bg-yellow-400' };
    case 'Expert':
      return { width: '100%', color: 'bg-green-500' };
    default:
      return { width: '0%', color: 'bg-gray-200' };
  }
  }              