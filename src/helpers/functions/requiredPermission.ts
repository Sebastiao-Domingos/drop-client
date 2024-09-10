import {
  Administrator,
  Client,
  Fornecedor,
} from "@/contexts/AuthenticationProvider";

function requiredPermission(
  user: Administrator | Client | Fornecedor,
  action: string
) {
  if (!("tipo_administrador" in user)) {
    return false;
  }

  return (
    user.tipo_administrador === "geral" ||
    user.admin_permissao.findIndex(
      (permission) => permission.permissao.nome === action
    ) !== -1
  );
}

export { requiredPermission };
