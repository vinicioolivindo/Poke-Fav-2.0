import imgLogo from "./assets/Poke-Fav-logo.png"
import CardPokemon from "./components/CardPokemon";
import { useState } from "react";
import SearchSide from "./components/SearchSide";
import translate from "translate";
import PopUpPokemon from "./components/PopUpPokemon";

const App = () => {

  const [inputValue, setinputValue] = useState("")
  const [statePopUp, setStatePopUp] = useState(false)

  const [dataPokemon, setDataPokemon] = useState({})

  const [myTeam, setMyTeam] = useState([])

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


  const toUpperFirstLetter = (name) => {
    return name.split(' ').map(letra => letra[0].toUpperCase() + letra.slice(1)).join(' ')
  }

  async function fechPokemons(nome) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)

      if (!response.ok) throw new Error("Pokémon não encontrado");

      const entrie = await response.json()

      const responseDescription = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nome}`)
      const description = await responseDescription.json()
      const descriptionText = description.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      const InPortuguese = await translate(descriptionText.flavor_text, "pt")

      const infos = {
        id: entrie.id.toString().padStart(3, '0'),
        name: toUpperFirstLetter(entrie.name),
        type: entrie.types.map((typeName, index) => {
          const typeClass = typeColors[typeName.type.name] || 'bg-gray-300';
          return (
            <span key={index} className={`px-2 py-1 rounded-lg text-white font-semibold ${typeClass}`}>
              {toUpperFirstLetter(typeName.type.name)}
            </span>
          );
        }),
        image: entrie.sprites.other["official-artwork"].front_default,
        description: InPortuguese,
        weight: entrie.weight,
        height: entrie.height,
        stats: entrie.stats,
        abilities: entrie.abilities.map((ability, index) => <span key={index} className="bg-slate-200 px-2 py-1 rounded-lg font-semibold">{toUpperFirstLetter(ability.ability.name)}</span>)
      }

      setDataPokemon(infos)
    } catch (error) {
      alert(error.message)
    }

  }

  const addEntrieInMyTeam = () => {
    try {
      const pokemonExistInTeam = myTeam.find(pokemon => pokemon.name === dataPokemon.name)

      if (pokemonExistInTeam) throw new Error("Pokémon ja esta em seu time")

      const MyNewTeam = [...myTeam, dataPokemon]
      setMyTeam(MyNewTeam)

    } catch (error) {
      alert(error.message)
    }
  }

  const handleClick = () => {
    statePopUp == true ? setStatePopUp(false) : setStatePopUp(true)
  }

  const isEmpty = (obj) => Object.keys(obj).length === 0;

  return (
    <div className="bg-slate-300 min-h-screen md:h-screen md:max-h-screen w-full relative">


      {statePopUp && <PopUpPokemon
        id={dataPokemon.id}
        name={dataPokemon.name}
        type={dataPokemon.type}
        description={dataPokemon.description}
        image={dataPokemon.image}
        weight={dataPokemon.weight}
        height={dataPokemon.height}
        stats={dataPokemon.stats}
        abilities={dataPokemon.abilities}
        onClickExit={handleClick}
        onClickAdd={addEntrieInMyTeam}
      />}

      <img src={imgLogo} className="m-auto lg:w-96 w-3/6 " />

      <div className="m-auto max-w-4xl p-3 flex flex-col md:flex-row justify-around">
        <div className="space-y-3 mb-4">
          <SearchSide value={inputValue}
            setValue={setinputValue} onClick={() => {
              fechPokemons(inputValue.toLowerCase())
            }} />

          <CardPokemon
            isEmpty={isEmpty(dataPokemon)}
            onClickHeart={addEntrieInMyTeam}
            onClickVerMais={handleClick}
            id={dataPokemon.id}
            name={dataPokemon.name}
            type={dataPokemon.type}
            description={dataPokemon.description}
            image={dataPokemon.image}
          />
        </div>


        <div className="flex md:justify-end justify-normal  gap-3 relative pt-10 flex-wrap">
          <h1 className="text-2xl font-bold absolute top-0 left-0 md:left-auto">My Team</h1>
          {
            myTeam.map((item) => (
              <CardPokemon
                key={item.id}
                itemInMyTeam={true}
                id={item.id}
                name={item.name}
                type={item.type}
                description={item.description}
                image={item.image}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App;
