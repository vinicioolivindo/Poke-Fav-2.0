import clsx from "clsx";

// eslint-disable-next-line react/prop-types
const CardPokemon = ({ id, name, type, image, description, itemInMyTeam = false }) => {
    return (
        <div className={clsx(
            "p-3 rounded-lg bg-stone-50/50 justify-between", // Classes fixas
            itemInMyTeam ? "flex-none " : "flex" // Classes condicionais
          )}>
            <div>
                <h2>0{id}</h2>
                <h1 className="text-3xl font-bold">{name}</h1>
                <span>{type}</span>
                {description}
            </div>
            <div>
                <img className="w-24" src={image} />
            </div>
        </div>
    )
}

export default CardPokemon;