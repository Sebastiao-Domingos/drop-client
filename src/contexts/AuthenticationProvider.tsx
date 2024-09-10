import { SessionData } from '@/controllers/Session';
import { useSession } from '@/hooks/useSession';
import React, { createContext, useState } from 'react';
import LoadingStatus from '../../@types/LoadingStatus';
import { useStatus } from '@/hooks/useLoadingStatus';
import { logger } from '@/Logger';
import { Permission } from '@/services/permissions';

interface AuthenticationContextProps {
  children: React.ReactNode;
  type: 'cliente' | 'administrador' | 'fornecedor' | 'estafeta' | 'recolha';
}

export type Client = {
  created_at: Date;
  endereco_id: string;
  id: string;
  nif: string;
  nome: string;
  tipo: 'Particular' | 'Empresa';
  updated_at: Date;
};

export type Administrator = {
  created_at: Date;
  id: string;
  nome: string;
  tipo_administrador: string;
  admin_permissao: { permissao: Permission }[];
  updated_at: Date;
};

export type Fornecedor = Administrator;

export type User = {
  tipo_usuario:
    | 'administrador'
    | 'cliente'
    | 'fornecedor'
    | 'estafeta'
    | 'recolha';
  usuario: Administrator | Client | Fornecedor;
  // | {
  //     created_at: Date;
  //     endereco_id: string;
  //     id: string;
  //     nif: string;
  //     nome: string;
  //     tipo: "Particular" | "Empresa";
  //     updated_at: Date;
  //   }
  // | {
  //     created_at: Date;
  //     id: string;
  //     nome: string;
  //     tipo_administrador: string;
  //     updated_at: Date;
  //   };
};

type AuthenticationContextType = {
  login: (data: SessionData) => void;
  loginStatus: LoadingStatus;
  user: User | null;
  errorMessage?: string;
};

const AuthenticationContext = createContext<AuthenticationContextType>({
  login(data) {},
  loginStatus: LoadingStatus.DONE,
  user: null,
});

function AuthenticationProvider({
  children,
  type,
}: AuthenticationContextProps) {
  const { mutation } = useSession();
  const { status, setStatus } = useStatus();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>();
  return (
    <AuthenticationContext.Provider
      value={{
        login(data) {
          setStatus(LoadingStatus.LOADING);
          mutation.mutate(data, {
            onSuccess({ user }) {
              if (user.tipo_usuario === type) {
                setUser(user);
                setStatus(LoadingStatus.SUCCESS);
              } else {
                setStatus(LoadingStatus.ERROR);
                fetch('/api/session/logout', { method: 'POST' });
              }
            },
            onError(error) {
              logger.error(error.message);
              setError(error.message);
              setStatus(LoadingStatus.ERROR);
            },
            onSettled() {
              setTimeout(() => {
                setStatus(LoadingStatus.DONE);
              }, 3000);
            },
          });
        },
        loginStatus: status,
        user,
        errorMessage: error || 'Contacto ou senha inválida',
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export { AuthenticationContext };
export default AuthenticationProvider;
