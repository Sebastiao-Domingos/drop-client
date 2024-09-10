"use client";

import EncomendaPorAnalisar from "@/components/EncomendasPorAnalisar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import SyncCartToDatabase from "@/components/SyncCartToDatabase";
import Navigation from "@/components/navegation";
import Menu from "@/components/navegation/Menu";
import AuthenticationProvider from "@/contexts/AuthenticationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider type="cliente">
        <SyncCartToDatabase />
        <div className="w-screen h-screen flex flex-col flex-nowrap overflow-hidden bg-slate-100 dark:!bg-gray-900">
          <Navigation />
          <div className="flex flex-row flex-nowrap h-full overflow-auto">
            {/* menu desktop */}

            <div className="hidden md:block relative">
              <div className="h-full">
                <Menu className="sticky md:pt-5 top-0 h-full bg-white dark:bg-gray-950" />
              </div>
            </div>
            {/* menu desktop fim */}

            {/* principal */}
            <div
              id="content"
              className="flex flex-col justify-between w-full h-full overflow-auto"
            >
              <span id="top"></span>
              <div className="w-full max-w-[1644px] md:mx-auto md:px-4 md:pt-4">
                {children}
                <Newsletter />
              </div>
              <Footer />
            </div>
          </div>
        </div>
        <EncomendaPorAnalisar />
      </AuthenticationProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
