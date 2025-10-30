export default function Label({ children, className, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`uppercase font-medium text-[14px] ${className}`}
    >
      {children}
    </label>
  );
}
