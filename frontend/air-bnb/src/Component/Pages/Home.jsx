import { apiRequest, logOutUrl } from "@/common/api";
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const Home = () => {
    const navigate = useNavigate()

    const handleLout = useMutation({
        mutationFn: async (data) => {
            const response = await apiRequest(logOutUrl, "POST", data);
            console.log("Login Success:", response);
            return response;
        },
        onSuccess: (data) => {
            toast.success(" Registered successfully:", data);
            navigate("/login")
        },
        onError: (error) => {
            toast.error(" Registration failed:", error.message);
        },
    })
    const handleClick = () => {
        console.log("click")
        handleLout.mutate()
    }
    return (
        <div>
            <Button onClick={() => handleClick()}>
                Logout
            </Button>
        </div>
    )
}