const Button = ({ children, ...props }) => {
  console.log(props);

  return (
    <button className="rounded-full  h-12 font-bold pr-5 pl-5 text-white bg-rose-600">
      {children}
    </button>
  );
};

export default Button;
