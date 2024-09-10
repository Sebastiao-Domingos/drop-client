import { twMerge } from "tailwind-merge";

interface ProductContainerColumnProps {
  className?: string;
  children: React.ReactNode;
}

function ProductContainerColumn({
  children,
  className = "",
}: ProductContainerColumnProps) {
  return (
    <div
      className={twMerge(
        "grid gap-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] items-start md:gap-1 group col",
        className
      )}
    >
      {children}
    </div>
  );
}

export default ProductContainerColumn;
