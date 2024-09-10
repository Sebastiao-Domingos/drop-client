import React from "react";
import { requiredPermission } from "../functions/requiredPermission";
import { useAuth } from "@/hooks/useAuth";
import PermissionRequired from "@/components/PermissionRequired";

function withRequiredPermission(Component: any, permission: string) {
  const HOC = (props: any) => {
    const { user } = useAuth();

    if (!user) {
      return <></>;
    }

    if (!requiredPermission(user.usuario, permission)) {
      return <PermissionRequired />;
    }
    return <Component {...props} />;
  };

  HOC.displayName = "PageWithRequiredPermission";

  return HOC;
}

export default withRequiredPermission;
