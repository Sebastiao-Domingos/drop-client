import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem';
import ProductContainerRowLoader from './ProductContainerRowLoader';

function ProductScreenDetailsLoader() {
  return (
    <div className="mx-auto mb-8 max-w-[1300px]">
      <Breadcrumb className="bg-transparent">
        <BreadcrumbItem name="Página inicial" href="/" />
      </Breadcrumb>

      <div className="pt-0 sm:py-8 px-3 md:px-0 z-50">
        <div className="flex mb-3 before:content-[''] before:px-[2px] before:mr-1 before:bg-primary before:rounded">
          <div className="h-5 w-24 rounded bg-slate-600 animate-pulse"></div>
        </div>
        <div className="h-3 w-20 rounded bg-slate-600 animate-pulse"></div>
        <div className="mt-2">
          <div className="h-3 w-24 rounded bg-slate-600 animate-pulse"></div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-3 lg:p-6 pb-0 rounded-lg shadow-lg lg:flex lg:flex-row lg:items-start gap-4">
        {/* imagens */}
        <div className="mb-8 lg:mb-0 lg:sticky lg:top-0 flex flex-col-reverse lg:flex-row items-start gap-4">
          <div className="w-full overflow-auto lg:w-20 flex flex-row lg:flex-col gap-2">
            <div className="bg-slate-600 w-16 h-16 animate-pulse rounded"></div>
            <div className="bg-slate-600 w-16 h-16 animate-pulse rounded"></div>
            <div className="bg-slate-600 w-16 h-16 animate-pulse rounded"></div>
          </div>
          <div className="w-full md:min-w-[640px] mx-auto">
            <div className="bg-slate-600 w-full h-56 md:h-80 animate-pulse rounded"></div>
          </div>
        </div>
        {/* outro */}
        <div className="w-full sm:ml-auto lg:max-w-[480px]">
          <div className="flex flex-col-reverse md:flex-row items-start justify-between">
            {/* preço */}
            <div className="">
              <div className="h-4 w-24 mb-2 rounded bg-slate-600 animate-pulse"></div>
              <div className="h-6 w-1/2 rounded bg-slate-600 animate-pulse"></div>
              <div className="mt-8 space-y-1">
                <div className="h-4 w-1/2 rounded bg-slate-600 animate-pulse"></div>
                <div className="h-4 w-1/2 rounded bg-slate-600 animate-pulse"></div>
                <div className="h-4 w-1/2 rounded bg-slate-600 animate-pulse"></div>
              </div>
            </div>
            {/* marca */}
            <div className="max-w-[120px] max-h-[120px] mb-4 lg:mb-0 overflow-hidden">
              <div className="w-[120px] h-[120px] bg-slate-600 rounded animate-pulse"></div>
            </div>
          </div>

          {/* quantidade */}
          <div className="space-y-8 mt-8">
            <div className="w-full flex items-center">
              <div className="flex flex-row items-center gap-1 mt-3">
                <input
                  type="text"
                  className="w-14 text-center p-2 rounded bg-slate-600 animate-pulse outline-none"
                  name="qtd"
                  id="qtd"
                  disabled
                />
                <div className="flex flex-col">
                  <button className="h-5 overflow-hidden">
                    <i className="ri-add-line"></i>
                  </button>
                  <button className="h-5 overflow-hidden">
                    <i className="ri-subtract-fill"></i>
                  </button>
                </div>
              </div>
              <span className="ml-3 text-xs mt-3">Unidades</span>
            </div>
            <div className="w-full rounded bg-slate-600 animate-pulse h-3 lg:w-32 p-3"></div>
          </div>

          {/* disponibilidade */}
          <div className="border rounded-lg p-4 mt-8">
            <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-start sm:items-center">
              <div className="rounded bg-slate-600 animate-pulse h-3 sm:w-32"></div>
              <div className="w-full rounded bg-slate-600 animate-pulse h-3 sm:w-32 p-2 text-white flex flex-row justify-center items-center gap-2"></div>
            </div>
            <div className="mt-8 text-sm space-y-3">
              <div>
                <div className="flex before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-primary/80 before:rounded-full before:mr-3">
                  <div className="rounded bg-slate-600 animate-pulse mb-2 h-3 w-28"></div>
                </div>

                <div className="rounded bg-slate-600 animate-pulse h-3 w-32 ml-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 px-3 md:px-0 h-6 w-32 mb-4 rounded uppercase font-bold before:content-[''] before:px-[2px] before:mr-1 before:bg-primary before:rounded bg-slate-600 animate-pulse"></div>

      <div className="bg-white dark:bg-gray-800 dark:bg-sl p-3 md:p-6 rounded-lg shadow-lg mt-8 gap-4">
        <div className="space-y-1">
          <div className="h-4 w-full rounded bg-slate-600 animate-pulse"></div>
          <div className="h-4 w-full rounded bg-slate-600 animate-pulse"></div>
          <div className="h-4 w-full rounded bg-slate-600 animate-pulse"></div>
        </div>
        <div className="space-y-1 mt-4">
          {new Array(3).fill('').map((_, idx) => (
            <div
              key={idx}
              className="h-4 w-1/2 rounded bg-slate-600 animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      <div className="mt-8 px-3 md:px-0 h-6 w-32 mb-4 rounded uppercase font-bold before:content-[''] before:px-[2px] before:mr-1 before:bg-primary before:rounded bg-slate-600 animate-pulse"></div>

      <div className="mx-3 md:mx-0">
        <ProductContainerRowLoader />
      </div>
    </div>
  );
}

export default ProductScreenDetailsLoader;
