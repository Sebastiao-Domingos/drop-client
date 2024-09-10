"use client";

import AuthenticationProvider from "@/contexts/AuthenticationProvider";
import PaymentPage from "@/screens/clients/Payment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page(props: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider type="cliente">
        <PaymentPage {...props} />
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}
