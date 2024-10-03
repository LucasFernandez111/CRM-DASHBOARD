import { BiSolidEditAlt } from "react-icons/bi";
const HeadersTable = ({ headers }: { headers: string[] }) => {
  return (
    <tr>
      {headers.map((header) => {
        return (
          <th scope="col" className="px-6 py-3" key={header}>
            {header}
          </th>
        );
      })}
      <th scope="col" className="px-6 py-3 flex justify-center items-center">
        <BiSolidEditAlt color="white" size={46} />
      </th>
    </tr>
  );
};

export default HeadersTable;
