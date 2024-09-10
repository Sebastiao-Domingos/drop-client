"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignUp() {
  const router = useRouter();
  return (
    <div className="flex w-full h-full /items-center /justify-center">
      <div className="hidden md:flex md:flex-col gap-2 md:w-[40%] bg-slate-100 p-4 rounded">
        {/* <h2 className="text-primary text-xl font-bold">Tela de cadastro de cliente</h2> */}
        <Image  src="/images/signup/computer.svg" alt="tela de signup" width={100} height={100} className="w-full h-full"/>
      </div>
      <div className="w-full md:w-[60%] h-[full] p-4">
        <div className="relative pb-2">
          <h2 className="text-primary font-bold md:text-2xl">Cadastro de Cliente</h2>
          <p className="text-xs italic">
            Os campos marcados com (
            <span className="text-red-600">*</span>) são obrigatórios
          </p> 
          <Link href= "/" className="absolute top-0 right-0"><i className="ri-close-line text-2xl"></i></Link>
        </div>
        <div className="w-full pt-4">
          <form action="" className="flex flex-col w-full space-y-4 md:h-[84vh]  md:overflow-auto">
              <div className="flex flex-col gap-2 w-full md:w-[49%]">
                <select
                  className="p-2 outline-none bg-slate-200 rounded w-full"
                  id="tipo"
                >
                  <option value="tipo" >Escolher o tipo de conta</option>
                  <option value="particular">Particular</option>
                  <option value="empresa">Empresa</option>
                </select>
              </div>
              <div className="md:flex gap-4 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="nome">Nome <span className="text-red-500">*</span></label>
                    <input type="text" name="nome" id="nome" 
                      className="p-2 border rounded outline-none focus:border-primary/60"
                      placeholder="Digite o teu nome"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="email">Email <span className="text-red-500">*</span></label>
                    <input type="text" name="email" id="email" 
                      className="p-2 border rounded outline-none focus:border-primary/60"
                      placeholder="Digite o teu email"
                    />
                  </div>
              </div>
              <div className="md:flex gap-4 w-full">
                  
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="whatsapp">Whatsapp <span className="text-red-500">*</span></label>
                    <input type="text" name="whatsapp" id="whatsapp" 
                      className="p-2 border rounded outline-none focus:border-primary/60"
                      placeholder="Digite o teu whatsapp"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="NIF">NIF <span className="text-red-500">*</span></label>
                    <input type="text" name="NIF" id="NIF" 
                      className="p-2 border rounded outline-none focus:border-primary/60"
                      placeholder="Digite o teu NIF"
                    />
                  </div>
              </div>
            
              <div className="md:flex gap-4 w-full">
                  <div className="flex flex-col gap-2 w-full md:w-[50%]">
                    <label htmlFor="provincia">Província <span className="text-red-500">*</span></label>
                    <select
                      className="p-2 outline-none bg-slate-200 rounded w-full"
                      id="provincia"
                    >
                      <option value="luanda">Luanda</option>
                      <option value="benguela">Benguela</option>
                      <option value="luanda">Luanda</option>
                      <option value="benguela">Benguela</option>
                      <option value="luanda">Luanda</option>
                      <option value="benguela">Benguela</option>
                      <option value="luanda">Luanda</option>
                      <option value="benguela">Benguela</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 w-full md:w-[50%]">
                    <label htmlFor="municipio">Município<span className="text-red-500">*</span></label>
                    <select
                      className="p-2 outline-none bg-slate-200 rounded w-full"
                      id="municipio"
                    >
                      <option value="luanda">Luanda</option>
                      <option value="viana">Viana</option>
                      <option value="luanda">Luanda</option>
                      <option value="viana">Viana</option>
                      <option value="luanda">Luanda</option>
                      <option value="viana">Viana</option>
                    </select>
                  </div>

              </div>
              <div className="md:flex gap-4 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="bairro">Bairro <span className="text-red-500">*</span></label>
                    <input type="text" name="bairro" id="bairro" 
                      className="p-2 border rounded outline-none focus:border-primary/60"
                      placeholder="Digite o teu bairro"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="rua">Rua <span className="text-red-500">*</span></label>
                    <input type="text" name="rua" id="rua" 
                      className="p-2 border rounded outline-none focus:border-primary/60"
                      placeholder="Digite o teu rua"
                    />
                  </div>
              </div>
              <div className="md:flex gap-4 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="referencia">Ponto de referência <span className="text-red-500">*</span></label>
                    <input type="text" name="referencia" id="referencia" 
                      className="p-2 border rounded outline-none focus:border-primary/60"
                      placeholder="Digite o teu ponto de  referência"
                    />
                  </div>
              </div>
              <div className="md:flex gap-4 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="pass1">Palavra passe <span className="text-red-500">*</span></label>
                    <input type="text" name="pass1" id="pass1" 
                      className="p-2 border rounded outline-none focus:border-primary/60"
                      placeholder="Digite o tua palavra passe"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="pass2">Confirmar a palavra passe <span className="text-red-500">*</span></label>
                    <input type="text" name="pass2" id="pass2" 
                      className="p-2 border rounded outline-none focus:border-primary/60"
                      placeholder="Digite a mesma  palavra passe"
                    />
                  </div>
              </div>
              <div className="md:sticky md:bottom-0 md:pt-4 space-x-8 bg-white ">
                <button type="submit" className="p-4 rounded bg-primary text-white w-[49%] active:bg-primary/60">Cadastrar-se</button>
                <Link href="/" className="pb-[2px] border-b italic text-primary"> Já tenho uma conta</Link>
              </div>
          </form>
        </div>
      </div>
    </div>
    );
  }
  