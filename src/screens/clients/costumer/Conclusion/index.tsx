'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

function Conclusion() {
  const query = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/user/perfil');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-[95vh]">
      <div className="text-center space-y-4 cursor-default">
        <span className="material-symbols-outlined text-primary text-9xl">
          verified
        </span>

        <div className="space-y-3">
          <p className="text-slate-600 text-center">Encomenda efectuada!</p>
          <p className="text-slate-600 text-center">
            Este é o código da sua encomenda:{' '}
            <span className="font-bold select-all">
              {query.get('encomenda')}
            </span>
          </p>
          <p className="text-slate-600 text-center">
            <Link href={'/'} className="text-primary cursor-pointer">
              Voltar às compras!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Conclusion;
