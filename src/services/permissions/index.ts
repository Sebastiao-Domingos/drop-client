import { api } from "@/infra/api";

export type Permission = {
  id: string;
  nome: string;
  descricao: string;
};

export type PermissionAdmin = {
  id: string;
  admin_id: string;
  permissao_id: string;
  permissao: Permission;
};

class PermissionService {
  private readonly BASE_PATH = "/permissao";

  public async getAll() {
    const response = await api
      .get<
        {},
        {
          data: Permission[];
        }
      >(this.BASE_PATH)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async getAllByAdmin(admin: string) {
    const response = await api
      .get<
        {},
        {
          data: PermissionAdmin[];
        }
      >(`/adminPermissao/${admin}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async addPermissionToAdmin(admin: string, permission: string[]) {
    const response = await api
      .post<
        {},
        {
          data: PermissionAdmin[];
        }
      >(`/adminPermissao/${admin}`, permission)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  public async removePermissionFromAdmin(admin: string, permission_id: string) {
    const response = await api
      .delete<
        {},
        {
          data: { message: string };
        }
      >(`/adminPermissao/${admin}/${permission_id}`)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }
}

export default PermissionService;
