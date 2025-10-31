import { apiRequest, signinUrl } from "@/common/api"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const Register = () => {
    const navigation = useNavigate()
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })

    const formMutation = useMutation({
        mutationFn: async (data) => {
            const response = await apiRequest(signinUrl, "POST", data);
            // console.log("Login Success:", response);
            return response;
        },
        onSuccess: (data) => {
            navigation("/login")
            toast.success("Registered sucessfully", data)
        },
        onError: (error) => {
            toast.error(" Registration failed:", error.message);
        },
    });

    function onSubmit(values) {
        // console.log("value", values)
        startTransition(async () => {
            formMutation.mutate(values)
        })
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
                        Sign In
                    </h2>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your username"
                                                type="name"
                                                {...field}
                                                className="focus:ring-2 focus:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your email"
                                                type="email"
                                                {...field}
                                                className="focus:ring-2 focus:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                                className="focus:ring-2 focus:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disable={isPending}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg"
                            >
                                {isPending ? "loading" : "Sign In"}
                            </Button>

                            <p className="text-center text-sm text-gray-600 mt-4">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Log In
                                </a>
                            </p>
                        </form>
                    </Form>
                </div>
            </div>
        </>

    )
}