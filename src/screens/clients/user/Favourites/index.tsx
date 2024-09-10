import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";

function Favourites() {
  return (
    <div>
      <Breadcrumb className="text-sm">
        <BreadcrumbItem href="/user/perfil" name="Minha Conta" />
        <BreadcrumbItem href="/user/favourites" name="Meus favoritos" />
      </Breadcrumb>
      <div>
        <h2 className="uppercase font-bold">Os meus favoritos preferidos</h2>
      </div>
      <div>
        <div className="py-8 ">
          <p className="text-[12px]">Ainda não tens produtos favoritos!</p>
        </div>
      </div>
    </div>
  );
}

export default Favourites;
