import { apiRequest, getUser } from "@/common/api";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";


export const userDataContext = createContext()

function UserContext({ children }) {

    // Fetch user data automatically
    const userData = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            return await apiRequest(getUser, "GET");
        },
    });

    return (
        <userDataContext.Provider value={userData}>
            {children}
        </userDataContext.Provider>
    )

}
export default UserContext
