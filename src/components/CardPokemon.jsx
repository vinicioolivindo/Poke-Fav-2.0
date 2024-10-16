import clsx from "clsx";
import Button from "./Button";
import { Heart } from "lucide-react";

// eslint-disable-next-line react/prop-types
const CardPokemon = ({ id, name, type, image, description, itemInMyTeam = false, onClickHeart }) => {
    return (
        <div className={clsx(
            "px-4 py-3 rounded-lg bg-stone-50/50 justify-between", // Classes fixas
            itemInMyTeam ? "flex-none " : "flex gap-3" // Classes condicionais
        )}>
            <div>
                <span className="bg-zinc-400 px-1 rounded-lg">{type}</span>

                <h1 className="text-xl font-bold text-gray-800">{name}</h1>


                <p className={clsx("text-xs max-w-44 mb-2",
                    {
                        "hidden": itemInMyTeam
                    }
                )
                }>{description}</p>

                {!itemInMyTeam &&
                    <div className="flex gap-2">
                        <Button content="Ver mais" />
                        <Button onClick={onClickHeart} content={<Heart size={19}/>}/>
                    </div>
                }

            </div>
            <div className="flex flex-col ">
                <h2 className={clsx("font-bold text-gray-800",
                    {
                        "flex justify-end": !itemInMyTeam
                    }
                )}>#00{id}</h2>

                <img className="w-28 flex " src={image} />
            </div>
        </div>
    )
}

export default CardPokemon;