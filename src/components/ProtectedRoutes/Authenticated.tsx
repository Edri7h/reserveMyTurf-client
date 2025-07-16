import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../redux/store";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Authenticated = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.user.user);

  // ✅ Redirect to dashboard or homepage depending on role
  if (user?.email) {
    if (user.role === "owner") return <Navigate to="/" />;
    if (user.role === "user") return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default Authenticated;
