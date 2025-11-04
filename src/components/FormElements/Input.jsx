import { forwardRef } from 'react';

const Input = forwardRef(function Input({ className = '', ...props }, ref) {
  return (
    <input
      ref={ref}
      className={`bg-white rounded-sm w-full py-2 px-3 text-[14px] border border-gray-300 outline-0 disabled:bg-gray-50 ${className}`}
      {...props}
    />
  );
});

export default Input;
