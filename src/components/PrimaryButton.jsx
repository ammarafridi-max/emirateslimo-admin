export default function PrimaryButton({
  children,
  className,
  size = 'medium',
  ...props
}) {
  let newClassName = className;

  if (size === 'large') {
    newClassName =
      newClassName +
      ` text-center text-white text-[15px] md:text-[18px] no-underline font-medium font-outfit py-3 px-5 rounded-sm capitalize bg-primary-500 hover:bg-primary-600 border border-solid border-primary-500 cursor-pointer duration-300  disabled:bg-primary-500 disabled:opacity-60 disabled:cursor-auto disabled:hover:bg-primary-500`;
  } else if (size === 'small') {
    newClassName =
      newClassName +
      ` text-center text-white text-[12px] md:text-[14px] no-underline font-light font-outfit py-2 px-4 rounded-sm capitalize bg-primary-500 hover:bg-primary-600 border border-solid border-primary-500 cursor-pointer duration-300  disabled:bg-primary-500 disabled:opacity-60 disabled:cursor-auto disabled:hover:bg-primary-500`;
  } else {
    newClassName =
      newClassName +
      ` text-center text-white text-[14px] md:text-[16px] no-underline font-regular font-outfit py-2.5 px-5 rounded-sm capitalize bg-primary-500 hover:bg-primary-600 border border-solid border-primary-500 cursor-pointer duration-300  disabled:bg-primary-500 disabled:opacity-60 disabled:cursor-auto disabled:hover:bg-primary-500`;
  }

  return (
    <button className={newClassName} {...props}>
      {children}
    </button>
  );
}
