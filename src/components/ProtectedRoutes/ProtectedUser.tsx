import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
};

const ProtectedUser = ({ children }: PropsType) => {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user?.email) return <Navigate to="/login" />;
  if (user.role !== "user") return <Navigate to="/" />;

  return <>{children}</>;
};

export default ProtectedUser;
