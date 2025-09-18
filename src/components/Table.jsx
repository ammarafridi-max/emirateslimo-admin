import { useContext } from 'react';
import { createContext } from 'react';

const TableContext = createContext();

function Table({ children, $columntemplate }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md shadow-gray-300">
      <TableContext.Provider value={{ $columntemplate }}>
        {children}
      </TableContext.Provider>
    </div>
  );
}

function Head({ children }) {
  const { $columntemplate } = useContext(TableContext);
  return (
    <div
      className={`grid bg-gray-800 text-white gap-2.5 py-2.5 px-5 mb-2.5 items-center`}
      style={{ gridTemplateColumns: $columntemplate.replace(/_/g, ' ') }}
    >
      {children}
    </div>
  );
}

function Heading({ children, textAlign = 'left' }) {
  return (
    <p className={`font-light text-[15px] text-${textAlign}`}>{children}</p>
  );
}

function Row({ children, onClick, href }) {
  const { $columntemplate } = useContext(TableContext);
  return (
    <a
      className={`text-black grid gap-2.5 py-1.5 px-5 mb-1 rounded-sm items-center duration-200 cursor-pointer hover:bg-primary-200`}
      style={{ gridTemplateColumns: $columntemplate.replace(/_/g, ' ') }}
      href={href}
      onClick={onClick}
      $columntemplate={$columntemplate}
    >
      {children}
    </a>
  );
}

function Item({ children, textAlign = 'left', textTransform = 'none' }) {
  return (
    <p
      className={`font-light text-[15px] text-${textAlign} ${textTransform} flex flex-col`}
    >
      {children}
    </p>
  );
}

function Footer({ children }) {
  return (
    <div className="bg-gray-800 text-white text-[14px] py-2.5 px-5">
      {children}
    </div>
  );
}

Table = Table;
Table.Head = Head;
Table.Heading = Heading;
Table.Row = Row;
Table.Item = Item;
Table.Footer = Footer;

export default Table;
