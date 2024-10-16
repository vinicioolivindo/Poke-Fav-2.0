// eslint-disable-next-line react/prop-types
const Button = ({icon}) => {
  return (
    <button 
    className="rounded-xl p-3 text-slate-50 bg-red-600 "> 
      {icon}
    </button>
  )
}

export default Button;