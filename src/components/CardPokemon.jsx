/* eslint-disable react/prop-types */
import clsx from "clsx";
import Button from "./Button";
import { Heart, SearchX } from "lucide-react";

// eslint-disable-next-line react/prop-types
const CardPokemon = ({ id, name, types, image, description, itemInMyTeam = false, onClickHeart, onClickVerMais, isEmpty }) => {

    const typeColors = {
        fire: 'bg-red-500',
        water: 'bg-blue-500',
        grass: 'bg-green-500',
        electric: 'bg-yellow-500',
        ice: 'bg-cyan-300',
        fighting: 'bg-orange-600',
        poison: 'bg-purple-500',
        ground: 'bg-yellow-800',
        flying: 'bg-indigo-300',
        psychic: 'bg-pink-500',
        bug: 'bg-lime-500',
        rock: 'bg-gray-600',
        ghost: 'bg-violet-800',
        dragon: 'bg-indigo-800',
        dark: 'bg-gray-800',
        steel: 'bg-slate-400',
        fairy: 'bg-pink-300',
        normal: 'bg-stone-400',
    };


    return (
        <div>
            <div className={clsx(
                "py-5 rounded-lg bg-stone-50/50 flex gap-1 font-semibold justify-center",
                isEmpty ? "block" : "hidden"
            )}>
                <h1>NENHUM POKEMON PESQUISADO</h1>
                <SearchX />
            </div>
            <div className={clsx(
                "px-4 py-3 rounded-lg bg-stone-50/50 justify-between",
                itemInMyTeam ? "flex-none w-40" : "flex gap-3",
                isEmpty ? "hidden" : "block"
            )}>
                <div>
                    <div className="flex gap-2">
                        <div className="flex gap-2">
                            {types.map((type, index) => {
                                const typeClass = typeColors[type] || 'bg-gray-300';
                                return (
                                    <span key={index} className={`px-2 py-1 rounded-lg text-white font-semibold ${typeClass}`}>
                                        {type}
                                    </span>
                                );
                            })}
                        </div>


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