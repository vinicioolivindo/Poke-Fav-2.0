import Button from "./Button";
import { Search } from "lucide-react";
import Input from "./Input";

// eslint-disable-next-line react/prop-types
const SearchSide = () => {
  return (
    <div className="w-full flex gap-3">
      <Input />
      <Button icon={<Search />} />
    </div>
  )
}
export default SearchSide;