import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

export default function FilterSearch({ searchParamName = 'search' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative">
      <input
        placeholder="Search..."
        type="text"
        className="w-fit min-w-[300px] bg-white text-[14px] py-1.5 px-5 rounded-md shadow-sm cursor-pointer outline-0"
        value={searchQuery}
        onChange={(e) => {
          const newParams = new URLSearchParams(searchParams);
          newParams.set(searchParamName, e.target.value);
          setSearchQuery(e.target.value);
          setSearchParams(newParams);
        }}
      />
      {searchParams.get(searchParamName) && (
        <MdClose
          onClick={() => {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete(searchParamName);
            setSearchParams(newParams);
            setSearchQuery('');
          }}
          className="text-black absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
        />
      )}
    </div>
  );
}
