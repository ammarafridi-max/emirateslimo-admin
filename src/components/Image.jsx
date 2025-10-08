import { Trash2 } from 'lucide-react';

export default function Image({
  src,
  className,
  featured,
  onDelete,
  isDeleting,
}) {
  return (
    <div className={`relative ${isDeleting && 'opacity-50'}`}>
      {featured && (
        <p className="absolute top-2 left-2 bg-accent-500 text-white py-1 px-3 text-[12px] font-light rounded-md">
          Featured
        </p>
      )}
      <img src={src} className={`rounded-lg ${className}`} />
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          className="absolute bottom-2 left-2 bg-red-500 text-white p-2 rounded-md cursor-pointer duration-300 hover:bg-red-600"
        >
          <Trash2 size={15} />
        </button>
      )}
    </div>
  );
}
