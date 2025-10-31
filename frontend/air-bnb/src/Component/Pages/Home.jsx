import { apiRequest, logOutUrl } from "@/common/api";
import { Button } from "@/components/ui/button"
import { userDataContext } from "@/context/userContext";
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const Home = () => {
    const navigate = useNavigate()
    // const { userData } = useContext(userDataContext)
    const { data: user, isLoading, isError } = useContext(userDataContext);

    const handleLout = useMutation({
        mutationFn: async (data) => {
            const response = await apiRequest(logOutUrl, "POST", data);
            return response;
        },
        onSuccess: (data) => {
            toast.success(" Logout successfully:", data);
            navigate("/login")
        },
        onError: (error) => {
            toast.error(" Logout failed:", error.message);
        },
    })
    const handleClick = () => {
        handleLout.mutate()
    }
    if (isLoading) return <p>Loading user...</p>;
    if (isError) return <p>Not logged in or failed to fetch user</p>;
    return (
        <div>
            <Button onClick={() => handleClick()}>
                Logout
            </Button>
            <h2>Welcome, {user?.email || "Guest"} </h2>

        </div>
    )
}