import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import  { resumeService } from "../config/api";


export const useResumes=(token,id=null)=>{
    const queryClient=useQueryClient();

    const resumes=useQuery({
      queryKey:['resumes'],
      queryFn:async()=>resumeService.getAll(token),
      enabled: !!token && !id,
      
    });
     const resume=useQuery({
       queryKey:['resume',id],
       queryFn:async()=>resumeService.getById(id,token),
       enabled: !!token && !!id,
    });
    const createMutation = useMutation({
      mutationFn:async (title) => resumeService.create(title, token),
      onSuccess: () => {
      queryClient.invalidateQueries(['resumes']);
      
    }
  });


  const deleteMutation = useMutation({
    mutationFn:async (id) => resumeService.delete(id, token),
     onSuccess: () => {
      queryClient.invalidateQueries(['resumes']);
    
    }
  });


  const updateMutation = useMutation({
    mutationFn: async(payload) => resumeService.update(payload, token),
    onSuccess: (resume) => {
      queryClient.invalidateQueries(['resumes']);
      queryClient.invalidateQueries(['resume', resume._id]);
    }
  });

   const upLoadMutation = useMutation({
    mutationFn:async (payload) => resumeService.upload(payload, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['resumes']);
 
    }
  });

  const enhanceSummaryMutation = useMutation({
    mutationFn:async (payload) => resumeService.enhanceSummary(payload, token),
    
  });

  const enhanceContentMutation = useMutation({
    mutationFn:async (payload) => resumeService.enhanceContent(payload, token),
    
  });

  return {
    resumes: resumes.data,
    resume:resume.data,
    isLoading: resumes.isLoading,
    isLoadingResume:resume.isLoading,
    create: createMutation.mutate,
    isCreating: createMutation.isPending,
    remove: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    update: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    enhanceSummary:enhanceSummaryMutation.mutate,
    isEnhancingSummary:enhanceSummaryMutation.isPending,
    enhanceContent:enhanceContentMutation.mutate,
    isEnhancingContent:enhanceContentMutation.isPending,
    upload:upLoadMutation.mutate,
    isUploading:upLoadMutation.isPending
  };
}