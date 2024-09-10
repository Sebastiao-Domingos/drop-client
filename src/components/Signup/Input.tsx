import { twMerge } from "tailwind-merge";

export default function InputTag({
  type,
  name,
  className = "",
  ...outers
}: any) {
  return (
    <div
      className={twMerge("py-1 flex flex-col space-y-1 mb-4", className)}
      {...outers}
    >
      <label htmlFor="input" className="text-sm">
        {name}
      </label>
      <input
        type={type}
        id={name}
        placeholder={name}
        className="p-2 rounded outline-none border border-gray-400"
      />
    </div>
  );
}
