// eslint-disable-next-line react/prop-types
const Input = ({ value, onChange }) => {
  return (
    <input 
    className=" text-lg rounded-md px-5 py-3 flex-1 shadow-md"
    type="text" 
    value={value}
    onChange={onChange}
    placeholder="Pesquise pelo Pokémon..."/>
  )
}

export default Input;