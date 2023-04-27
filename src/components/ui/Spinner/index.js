export const Spinner = () => {
  return (
    <div className="relative">
      <div className="w-20 h-20 border-primary border-2 rounded-full"></div>
      <div className="w-20 h-20 border-background border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
      <div className="pt-4">...Loading</div>
    </div>
  );
};
