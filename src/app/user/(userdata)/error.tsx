"use client";

import React, { useEffect } from "react";
import Error from "@/screens/Error";
// import { useUserData } from "@/hooks/useUserData";
// import { useGetDataUsuario } from "@/hooks/useGetClientes";

// function ErrorExtended(props: {
//   error: Error & { digest?: string };
//   reset: () => void;
// }) {
//   const { data, result } = useGetDataUsuario();

//   useEffect(() => {
//     console.log("user:", data);
//     console.log("error:", result.error);
//   });
//   return <Error {...props} />;
// }

export default Error;
