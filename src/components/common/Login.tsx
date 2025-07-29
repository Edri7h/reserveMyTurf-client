import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../../lib/axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { setToken, setUserInfo } from "../../redux/slice/userSlice";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
  const newErrors = { email: "", password: "" };
  let isValid = true;

  if (!form.email.trim()) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = "Please enter a valid email";
    isValid = false;
  }

  if (!form.password.trim()) {
    newErrors.password = "Password is required";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const res = await axiosClient.post("/api/auth/login", form);
      dispatch(setUserInfo(res.data.user));
      dispatch(setToken(res.data.user));
      toast.success("Welcome back! Login successful");
      navigate("/");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { msg?: string } } };
      toast.error(error?.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Sign in to your TurfBooking account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot your password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-semibold text-sm transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-5 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">New to TurfBooking?</span>
            </div>
          </div>

          {/* Register */}
          <div className="mt-4 text-center">
            <Link to="/register" className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
              Create your account
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            By signing in, you agree to our{" "}
            <Link to="/" className="text-blue-600 hover:text-blue-700 underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/" className="text-blue-600 hover:text-blue-700 underline">
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
