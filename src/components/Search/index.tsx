"use client";
import FullModal from "../Modals/FullModal";

export default function Search() {
  return (
    <FullModal className="block">
      <div>
        <div className="mt-4 py-2 bg-white flex items-center shadow rounded">
          <button className="text-lg px-2">
            <i className="ri-mic-line"></i>
          </button>
          <div className="relative border-l-2 px-2 flex items-center w-full">
            <input
              type="text"
              name="search"
              id="search"
              className="outline-none w-full peer"
              placeholder=" "
            />
            <label
              htmlFor="search"
              className="peer-placeholder-shown:block hidden select-none opacity-30 absolute top-1/2 -translate-y-1/2 cursor-text"
            >
              <span className="flex items-center">
                <i className="mr-2 ri-search-line"></i>
                Pesquisa aqui
              </span>
            </label>
          </div>

          <button className="text-3xl text-red-500 mr-2">
            <i className="ri-close-line"></i>
          </button>
        </div>
      </div>
    </FullModal>
  );
}
