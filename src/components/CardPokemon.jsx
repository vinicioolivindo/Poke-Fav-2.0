import clsx from "clsx";
import Button from "./Button";
import { Heart, SearchX } from "lucide-react";

// eslint-disable-next-line react/prop-types
const CardPokemon = ({ id, name, type, image, description, itemInMyTeam = false, onClickHeart, onClickVerMais, isEmpty }) => {


    return (
        <div>
            <div className={clsx(
                "py-5 rounded-lg bg-stone-50/50 flex gap-1 font-semibold justify-center",
                isEmpty ? "block" : "hidden"
            )}>
                <h1>NENHUM POKEMON PESQUISADO</h1>
                <SearchX/>
            </div>
            <div className={clsx(
                "px-4 py-3 rounded-lg bg-stone-50/50 justify-between",
                itemInMyTeam ? "flex-none" : "flex gap-3",
                isEmpty ? "hidden" : "block"
            )}>
                <div>
                    <div className="flex gap-2">
                        {type}
                    </div>
                    <h1 className="text-xl font-bold text-gray-800">{name}</h1>
                    <p className={clsx("text-xs max-w-44 mb-2",
                        {
                            "hidden": itemInMyTeam
                        }
                    )
                    }>{description}</p>
                    {!itemInMyTeam &&
                        <div className="flex gap-2">
                            <Button onClick={onClickVerMais} content="Ver mais" />
                            <Button onClick={onClickHeart} content={<Heart size={19} />} />
                        </div>
                    }
                </div>
                <div className="flex flex-col ">
                    <h2 className={clsx("font-bold text-gray-800",
                        {
                            "flex justify-end": !itemInMyTeam
                        }
                    )}>#{id}</h2>
                    <img className="w-28 flex " src={image} alt={`imagem de ${name}`} />
                </div>
            </div>
        </div>
    )
}

export default CardPokemon;