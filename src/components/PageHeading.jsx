export default function PageHeading({ children, className }) {
  return <h1 className={`font-normal text-[28px] ${className}`}>{children}</h1>;
}
