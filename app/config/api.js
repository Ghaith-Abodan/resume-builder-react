import axios from "axios";


const api=axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    
})

const publicApi=axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    
})

const getAuthHeader=(token)=>({
     headers:{Authorization:token}
})

export const resumeService={
    getAll:async(token)=>{
        const {data}=await api.get('/api/users/resumes',getAuthHeader(token))
        return data.resumes
    },
    getPublicById:async(id)=>{
        const {data}=await publicApi.get(`/api/resumes/public/${id}`)
        return data.resume
    },
    getById:async(id,token)=>{
        const {data}=await api.get(`/api/resumes/get/${id}`,getAuthHeader(token))
        return data.resume
    },

    create: async (title, token) => {
    
    const {data} = await api.post('/api/resumes/create', title, getAuthHeader(token));
     
    return data.resume;
    },

    update: async (payload, token) => {
    const {data}=  await api.put(`/api/resumes/update`,
        payload,getAuthHeader(token))
       
         return data.resume
    },

    delete: async (id, token) => {
     const {data}=  await api.delete(`/api/resumes/delete/${id}`, getAuthHeader(token));
        return data
    },   

    upload: async (payload, token) => {
     
     const {data}=  await api.post(`/api/ai/upload-resume`,
       payload, getAuthHeader(token))
   
       return data.resumeId
      },

     enhanceSummary:async(payload,token)=>{
        const {data}=  await api.post(`/api/ai/enhance-pro-sum`,
        {userContent:payload},getAuthHeader(token))
        return data
    },
    enhanceContent:async(payload,token)=>{
        const {data}= await api.post(`/api/ai/enhance-content`,
        {userContent:payload},getAuthHeader(token))
        return data
    },  


}
export default api