import { apiRequest, getUser } from "@/common/api";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";


export const userDataContext = createContext()

function UserContext({ children }) {
    const userData = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await apiRequest(getUser, "GET");
            return response.user;
        },
        retry: false,
        refetchOnWindowFocus: false,
    });


    return (
        <userDataContext.Provider value={userData}>
            {children}
        </userDataContext.Provider>
    )

}
export default UserContext
