import { logger } from "@/Logger";
import { api } from "@/infra/api";

export type Admin = {
  id: string;
  nome: string;
  tipo_administrador: string;
  created_at: Date;
};

export type AdminGetResponse = {
  administrador: Admin[];
  total: number;
  prevPage: number | null;
  nextPage: number | null;
  currentPage: number;
  peerPage: number;
  lastPage: number;
};

export type AdminData = {
  nome: string;
  email: string;
  whatsapp?: string;
  senha: string;
};
export type AdminDataCreate = {
  nome: string;
  email: string;
  senha: string;
};
export type AdminDataUpdate = {
  nome?: string;
  senha?: string;
};

export type AdminDataResponseUpdated = {
    nome: string,
    tipo_administrador: string,
    created_at: Date
}


export type SearchAdminParams = {
  nome: string;
  tipo_administrador: "normal" | "geral";
  currentPage: number;
  peerPage: number;
};

class AdminService {
  //private readonly BASE_PATH = "/c"
  public async create(admin: AdminDataCreate) {
    // try {
    const response = await api
      .post<{}, { data: Admin }>("/cadastro/administrador", admin)
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * getAdmin
   */
  public async getAdmins(params: URLSearchParams) {
    const response = await api
      .get<{}, { data: AdminGetResponse }>(
        `/administrador?${params.toString()}`
      )
      .then((res) => res.data);

    return {
      status: 200,
      response,
    };
  }

  /**
   * name
   */
  public async update( admin_id : string , admin : AdminDataUpdate) {

    
    if( admin.senha){
       const response =  await api.put<{},{ data : AdminDataResponseUpdated}>(
        `/administrador/novasenha/${admin_id}`, admin
      ).then( response => {
        return {
          status : 200,
          response : response.data
        }
      }).catch( error => {
        console.log("atualização  de nome: ", error);
      })
      return response
    }else {
      const response = await api.put<{},{ data : AdminDataResponseUpdated}>(
        `/administrador/novonome/${admin_id}`,admin
      ).then( response => {
        return {
          status : 200,
          response : response.data
        }
      }).catch( error => {
        console.log(error);
      })
      return response
    }
  }
}

export default AdminService;
