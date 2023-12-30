const useTitle = (title: string): Function => {
  const prevTitle = document.title;
  document.title = title;
  return () => {
    document.title = prevTitle;
  };
};

export default useTitle;
