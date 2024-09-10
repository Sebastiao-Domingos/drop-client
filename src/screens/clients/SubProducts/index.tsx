import Breadcrumb from "./../../../components/Breadcrumb/index";
import BreadcrumbItem from "./../../../components/Breadcrumb/BreadcrumbItem";
import SubProductItem from "./SubProductItem";

function SubProducts() {
  return (
    <div className="w-full">
      <Breadcrumb className="">
        <BreadcrumbItem name="Categoria" href="/" />
        <BreadcrumbItem name="Sub-categoria" href="/" />
        <BreadcrumbItem name="Sub-produto" href="/" />
      </Breadcrumb>
      <div className="w-full mb-4">
        <h3 className="text-xl text-primary text-center">Produtos</h3>
      </div>
      <div className="px-6 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6">
        {Array(15)
          .fill("")
          .map((index, item) => (
            <SubProductItem
              key={index}
              title="Product 1"
              image="/images/VICO230V.png-300x300.png"
              href="/"
            />
          ))}
      </div>

      <div className="mt-6">
        <h3>Produtos recomendados</h3>

        <div></div>
      </div>
    </div>
  );
}

export default SubProducts;
