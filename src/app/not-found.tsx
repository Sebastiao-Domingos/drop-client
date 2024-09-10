'use client';

import React, { useContext } from 'react';
import Layout from './(clients)/layout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ThemeContext } from '@/contexts/ThemeProvider';
import Image from 'next/image';

function NotFound() {
  const { theme } = useContext(ThemeContext);

  const path = usePathname();
  return (
    <Layout>
      <div>
        <div className="text-9xl text-center font-bold flex items-center justify-center py-8 px-4">
          <Image
            src={`/images/404-${theme || 'light'}.png`}
            height={200}
            width={300}
            alt="404 - não encontrado"
            className="max-w-[450px] w-full h-auto sm:w-[450px] pointer-events-none"
          />
        </div>
        <p className="mt-4 text-center text-gray-900 dark:text-gray-300">
          O caminho <span className="italic font-bold">{path}</span> não existe!
        </p>
        <p className="mt-4 text-blue-600 text-center">
          <Link href="/">Voltar na página inicial</Link>
        </p>
      </div>
    </Layout>
  );
}

export default NotFound;
