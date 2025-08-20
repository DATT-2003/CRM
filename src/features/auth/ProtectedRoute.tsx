// import React from "react";
// import { Navigate } from "react-router-dom";
// import { getAuth } from "../../utils/auth";

// interface Props {
//   children: React.ReactNode; //
//   allow?: ("ADMIN" | "MANAGER" | "SALES")[];
// }

// export default function ProtectedRoute({ children, allow }: Props) {
//   const user = getAuth();

//   // Chưa login → quay về login
//   if (!user) return <Navigate to="/login" replace />;

//   // Có role nhưng không nằm trong allow → báo Access Denied
//   if (allow && !allow.includes(user.role)) {
//     return <div style={{ padding: 20 }}>🚫 Access Denied</div>;
//   }

//   return <>{children}</>; // 👈 ReactNode cần bọc trong Fragment
// }
import React from "react";

interface Props {
  children: React.ReactNode;
  allow?: ("ADMIN" | "MANAGER" | "SALES")[];
}

export default function ProtectedRoute({ children }: Props) {
  return <>{children}</>;
}
