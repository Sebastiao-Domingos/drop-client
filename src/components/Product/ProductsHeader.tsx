interface ProductsHeaderProps {
  title: string;
  description?: string;
}

function ProductsHeader({ title, description }: ProductsHeaderProps) {
  return (
    <>
      <div className="py-8 sticky top-0 bg-slate-100 dark:!bg-gray-900 z-40">
        <h1 className="text-xl uppercase font-bold before:content-[''] before:px-[2px] before:mr-1 before:bg-primary before:rounded">
          {decodeURIComponent(title.replaceAll("-", " "))}
        </h1>
      </div>
      <p className="text-sm">
        Nesta secção vai encontrar uma vasta seleção de{" "}
        {decodeURIComponent(title.replaceAll("-", " "))}
      </p>
      {description && <p className="text-sm font-bold">{description}</p>}
    </>
  );
}

export default ProductsHeader;
