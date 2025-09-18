import { forwardRef } from 'react';

const Textarea = forwardRef(function Textarea(
  { className = '', rows = 7, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={`bg-white rounded-sm w-full py-2.5 px-5 text-[14px] border-1 border-gray-300 outline-0 ${className}`}
      {...props}
    />
  );
});

export default Textarea;
