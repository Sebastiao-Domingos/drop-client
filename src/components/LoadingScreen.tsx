function LoadingScreen() {
  return (
    <div className="text-5xl flex flex-col justify-center items-center bg-white dark:bg-gray-950 fixed inset-0 z-50">
      <i className="ri-loader-line animate-spin"></i>
      <p className="text-3xl mt-3 text-center">Carregando</p>
    </div>
  );
}

export default LoadingScreen;
