import { twMerge } from "tailwind-merge";

interface BreadcrumbProps {
  children: React.ReactNode;
  className?: string;
}

function Breadcrumb({ children, className = "" }: BreadcrumbProps) {
  return (
    <div
      className={twMerge("p-2 bg-gray-100 dark:bg-transparent mb-8", className)}
    >
      <ul className="flex flex-row flex-nowrap items-center overflow-auto gap-2">
        {children}
      </ul>
    </div>
  );
}

export default Breadcrumb;
