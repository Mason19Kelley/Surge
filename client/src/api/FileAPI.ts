import { api } from "./axiosConfig";

export const FileAPI = {
    getFile: async (fileName: string) => {
      const { data } = await api.get(`/file/getFile/${fileName}`, {
        responseType: 'blob',
      });
      return data
    },

    uploadFile: async(file: any) => {
      const { data } = await api.post('file/uploadFile', file);
      console.log(data)
    },

    deleteFile: async (fileName: string) => {
      const { data } = await api.post(`/file/deleteFile/${fileName}`);
      return data
    }
    


}