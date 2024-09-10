function MenuCategoryLoader() {
  return (
    <>
      {new Array(6).fill("").map((_, index) => (
        <div
          key={index}
          className="w-full flex flex-row flex-nowrap gap-2 items-center animate-pulse dark:bg-gray-800"
        >
          <div className="h-6 w-6 md:!w-9 md:!h-9 rounded bg-slate-600"></div>
          <div className="h-[10px] w-full md:hidden md:group-hover:block rounded bg-slate-600"></div>
        </div>
      ))}
    </>
  );
}

export default MenuCategoryLoader;

function MenuCategoryLoaderMobile() {
  return (
    <>
      {new Array(8).fill("").map((_, index) => (
        <div
          key={index}
          className="/w-[200px] h-[100px] rounded p-2 flex flex-col gap-2 justify-center items-center animate-pulse dark:bg-gray-800"
        >
          <div className="w-[40px] h-[40px] rounded bg-slate-600"></div>
          <div className="h-[10px] w-full md:hidden md:group-hover:block rounded bg-slate-600"></div>
        </div>
      ))}
    </>
  );
}

export { MenuCategoryLoaderMobile };
