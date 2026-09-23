import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import PasswordInput from "../components/PasswordInput.jsx";

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { register: signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signup(data);
      toast.success("Account created!");
      navigate("/dashboard");
    } catch (e) {
      toast.error(e.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="card p-8 w-full max-w-md space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1">Join TravelGo in seconds</p>
        </div>

        <div>
          <label className="label">Full Name</label>
          <input className="input" {...register("name", { required: "Name is required" })} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div>
          <label className="label">Email</label>
          <input type="email" className="input"
            {...register("email", { required: "Email is required" })} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div>
          <label className="label">Phone</label>
          <input className="input"
            {...register("phone", {
              required: "Phone is required",
              pattern: { value: /^[0-9]{10,15}$/, message: "Invalid phone" },
            })} />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="label">Password</label>
          <PasswordInput
            register={register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "At least 8 characters" },
            })}
            error={errors.password}
            placeholder="Create a password"
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className="label">Confirm Password</label>
          <PasswordInput
            register={register("confirmPassword", {
              required: "Please confirm password",
              validate: (v) => v === password || "Passwords do not match",
            })}
            error={errors.confirmPassword}
            placeholder="Re-enter your password"
            autoComplete="new-password"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}