import { api } from "./axiosConfig";

// login functions
export const AuthAPI = {
    // logs in using credentials
    login: async (email: string, password: string) => {
        const { data } = await api.post("/auth/login", {
            email: email,
            password: password
          });
        // sets auth token to jwt
        api.defaults.headers['Authorization'] = `Bearer ${data}`;
        return data;
      },
    // used to test that auth is working in app.tsx
    checkUser: async () => {
      const { data } = await api.get("/auth/profile");
      return data
    },

    getUser: async (id: number) => {
      const { data } = await api.get(`/users/getUser/${id}`)
      return data
    }
}