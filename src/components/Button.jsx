// eslint-disable-next-line react/prop-types
const Button = ({content, onClick}) => {
  return (
    <button onClick={onClick} 
    className="rounded-lg px-3 py-1 text-slate-50 bg-red-600 shadow-md"> 
      {content}
    
    </button>
  )
}

export default Button;