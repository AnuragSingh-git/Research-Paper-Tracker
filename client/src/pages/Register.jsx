import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

import { registerUser } from "../services/authApi";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);

      toast.success("Account Created Successfully");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <Card className="w-full max-w-md">

        <CardContent className="p-8">

          <h1 className="text-3xl font-bold text-center mb-6">
            Register
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", {
                  required: "Name is required",
                })}
                className="w-full rounded-md border px-3 py-2"
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
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
              Register
            </Button>

          </form>

          <p className="text-center mt-6">
            Already have an account?

            <Link
              to="/"
              className="ml-2 text-indigo-600 hover:underline"
            >
              Login
            </Link>

          </p>

        </CardContent>

      </Card>

    </div>
  );
}