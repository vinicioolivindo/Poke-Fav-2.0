import imgLogo from "./assets/Poke-Fav-logo.png"
import CardPokemon from "./components/CardPokemon";
import { useState } from "react";
import SearchSide from "./components/SearchSide";

const App = () => {

  const [entrie, setEntrie] = useState(
    {
      id: 1,
      name: "Pikachu",
      type: "eletric",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      description: "lalalala",
    }
  )

  return (
    <div className="bg-slate-300 w-screen h-screen ">
      <img src={imgLogo} className="m-auto lg:w-96 w-3/6 " />
      <div className="m-auto max-w-4xl p-3 flex flex-col md:flex-row justify-evenly">
        <div className="space-y-3 mb-4">
          <SearchSide />

          <CardPokemon
            id={entrie.id}
            name={entrie.name}
            type={entrie.type}
            description={entrie.description}
            image={entrie.image}
          />
        </div>
        <div className="flex gap-3 relative pt-10 ">
          <h1 className="text-2xl font-bold absolute top-0">My Team</h1>
          <CardPokemon
            itemInMyTeam={true}
            id={entrie.id}
            name={entrie.name}
            type={entrie.type}
            description={entrie.description}
            image={entrie.image}
          />
          <CardPokemon
            itemInMyTeam={true}
            id={entrie.id}
            name={entrie.name}
            type={entrie.type}
            description={entrie.description}
            image={entrie.image}
          />
        </div>
      </div>
    </div>
  )
}

export default App;
