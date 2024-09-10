"use client";

import AuthenticationProvider from "@/contexts/AuthenticationProvider";
import PaymentSuccess from "@/screens/clients/Payment/Success";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page(props: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider type="cliente">
        <PaymentSuccess {...props} />
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}
