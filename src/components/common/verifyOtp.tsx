import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Label } from "../../components/ui/label";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Mail, ArrowLeft, RefreshCw } from "lucide-react";
import axiosClient from "../../lib/axios";
import { toast } from "sonner";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.user.email);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [resendLoading, setResendLoading] = useState(false);
  const otpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!email) navigate("/register");
    otpInputRef.current?.focus();
  }, [email, navigate]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev === 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }
    try {
      setLoading(true);
      await axiosClient.post("/api/auth/verify-otp", { email, otp });
      toast.success("Verified Successfully! Please login");
      navigate("/login");
    } catch (err: unknown) {
      const error = err as {response:{data:{msg:string}}}
      const msg = error?.response?.data?.msg || "Verification failed";
      setError(msg);
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResendLoading(true);
      await axiosClient.post("/api/auth/resend-otp", { email });
      toast.success("OTP resent");
      setOtp("");
      setResendTimer(60);
    } catch (err: unknown) {
       const error = err as {response:{data:{msg:string}}}
      const msg = error?.response?.data?.msg || "Failed to resend OTP";
      setError(msg);
    } finally {
      setResendLoading(false);
    }
  };

  const maskedEmail = email?.replace(/(.{2})(.*)(@.*)/, "$1***$3");

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-white">
      <Card className="w-full max-w-md border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Mail className="w-5 h-5 text-gray-700" />
          </div>
          <CardTitle className="text-xl">Verify Your Email</CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            A 6-digit code was sent to <strong>{maskedEmail}</strong>
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleVerify} className="space-y-3">
            <div>
             
              <Input
                ref={otpInputRef}
                id="otp"
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6-digit code"
                className="text-center font-mono tracking-wider text-lg"
                disabled={loading}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">Didn’t receive the code?</p>
            <Button
              type="button"
              variant="link"
              className="text-blue-600"
              onClick={handleResend}
              disabled={resendLoading || resendTimer > 0}
            >
              {resendLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin mr-1" />
              ) : resendTimer > 0 ? (
                `Resend in ${resendTimer}s`
              ) : (
                "Resend Code"
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="text-gray-600"
              onClick={() => navigate("/register")}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
