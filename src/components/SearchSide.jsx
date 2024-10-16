import Button from "./Button";
import { Search } from "lucide-react";
import Input from "./Input";

// eslint-disable-next-line react/prop-types
const SearchSide = ({ value, setValue, onClick }) => {
  return (
    <div className="w-full flex gap-3">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={onClick} content={<Search />} />
    </div>
  );
};

export default SearchSide;
