import React from "react";

function PermissionRequired() {
  return (
    <div className="p-6 my-10 text-center font-bold text-3xl text-red-600 uppercase rounded shadow dark:bg-slate-900">
      Não tens permissão para aceder a esta informação!
    </div>
  );
}

export default PermissionRequired;
