import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

import { loginUser } from "../services/authApi";
import useAuth from "../hooks/useAuth";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data);

      await checkAuth();

      toast.success("Welcome Back!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">

          <h1 className="text-3xl font-bold text-center mb-6">
            Login
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full rounded-md border px-3 py-2"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full rounded-md border px-3 py-2"
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Login
            </Button>

          </form>

          <p className="mt-6 text-center">
            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-indigo-600 hover:underline"
            >
              Register
            </Link>

          </p>

        </CardContent>
      </Card>
    </div>
  );
}