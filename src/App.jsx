import imgLogo from "./assets/Poke-Fav-logo.png"
import CardPokemon from "./components/CardPokemon";
import { useEffect, useState } from "react";
import SearchSide from "./components/SearchSide";

const App = () => {

  const [inputValue, setinputValue] = useState("")

  const [entrie, setEntrie] = useState(
    {
    })

  const [myTeam, setMyTeam] = useState([
    {
      id: 2,
      name: "Pikachu",
      type: "eletric",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      description: "lore",
    },
  ]
  )

  async function fechPokemons(nome) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
    const entrie = await response.json()

    const responseDescription = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nome}`)
    const description = await responseDescription.json()
    const descriptionInPortuguese = description.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );

    const infos = {
      id: entrie.id,
      name: entrie.name.split(' ').map(letra => letra[0].toUpperCase() + letra.slice(1)).join(' '),
      type: entrie.types.map(typeName => typeName.type.name),
      image: entrie.sprites.other["official-artwork"].front_default,
      description: descriptionInPortuguese.flavor_text
    }
    console.log(descriptionInPortuguese);
    
    setEntrie(infos)
  }

  const addEntrieInMyTeam = () => {
    const MyNewTeam = [...myTeam, entrie]
    setMyTeam(MyNewTeam)
  }

  return (
    <div className="bg-slate-300 min-h-screen md:h-screen md:max-h-screen w-full ">
      <img src={imgLogo} className="m-auto lg:w-96 w-3/6 " />
      <div className="m-auto max-w-4xl p-3 flex flex-col md:flex-row justify-around">
        <div className="space-y-3 mb-4">
          <SearchSide value={inputValue} 
          setValue={setinputValue} onClick={() => {
            fechPokemons(inputValue)
          }} />

          <CardPokemon
            onClickHeart={addEntrieInMyTeam}
            id={entrie.id}
            name={entrie.name}
            type={entrie.type}
            description={entrie.description}
            image={entrie.image}
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
