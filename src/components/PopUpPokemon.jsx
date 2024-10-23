/* eslint-disable react/prop-types */

import Button from "./Button";

const PopUpPokemon = ({
  id,
  name,
  types,
  image,
  description,
  height,
  weight,
  stats,
  abilities,
  onClickExit,
  onClickAdd,
  showAddButton // Recebe a flag para decidir se exibe o botão "Adicionar"
}) => {
  const statNames = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'SpA',
    'special-defense': 'SpD',
    speed: 'SPD',
  };

  const colors = [
    'bg-red-300',
    'bg-blue-300',
    'bg-green-300',
    'bg-yellow-300',
    'bg-purple-300',
    'bg-pink-300',
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-10/12 h-5/6 overflow-scroll block md:flex md:flex-row gap-8 max-w-3xl md:h-auto">
        <div className="block md:flex flex-col items-center">
          <div className="flex gap-2 mb-1">
            <Button onClick={onClickExit} content="Sair" />
            {showAddButton && (
              <Button onClick={onClickAdd} content="Adicionar ao time" />
            )}
          </div>
          <img
            className="m-auto w-36 md:w-56"
            src={image}
            alt={`imagem de ${name}`}
          />
        </div>

        <div className="flex-1">
          <h4 className="font-semibold">#{id}</h4>
          <h1 className="text-3xl font-bold">{name}</h1>

          <div className="flex gap-2 my-2">
            {types.map((type, index) => (
              <span key={index} className="bg-slate-200 px-2 py-1 rounded-md">
                {type}
              </span>
            ))}
          </div>

          <p className="text-sm">{description}</p>

          <div className="flex gap-4 my-3">
            <span className="flex gap-5 bg-slate-200 py-1 px-2 rounded-md">
              <h3>Height</h3>
              <span>{height}</span>
            </span>
            <span className="flex gap-5 bg-slate-200 py-1 px-2 rounded-md">
              <h3>Weight</h3>
              <span>{weight}</span>
            </span>
          </div>

          <h2 className="text-xl font-semibold mb-1">Stats</h2>
          <ul className="max-w-80 flex flex-wrap gap-3">
            {stats.map((stat, index) => (
              <li
                key={stat.stat.name}
                className={`flex gap-4 p-2 rounded text-white ${colors[index % colors.length]}`}
              >
                <span>{statNames[stat.stat.name] || stat.stat.name}</span>
                <span>{stat.base_stat}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mt-3 mb-1">Abilities</h2>
          <div className="flex gap-2">
            {abilities.map((ability, index) => (
              <span
                key={index}
                className="bg-slate-200 px-2 py-1 rounded-lg font-semibold"
              >
                {ability}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpPokemon;
