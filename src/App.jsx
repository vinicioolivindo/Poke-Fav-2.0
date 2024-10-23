import imgLogo from "./assets/Poke-Fav-logo.png";
import CardPokemon from "./components/CardPokemon";
import { useEffect, useState } from "react";
import SearchSide from "./components/SearchSide";
import translate from "translate";
import PopUpPokemon from "./components/PopUpPokemon";
import { BookmarkX } from "lucide-react";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [statePopUp, setStatePopUp] = useState(false);
  const [dataPokemon, setDataPokemon] = useState({});
  const [showAddButton, setShowAddButton] = useState(true);


  const [myTeam, setMyTeam] = useState(() => {
    const storedTeam = localStorage.getItem("myTeam");
    return storedTeam ? JSON.parse(storedTeam) : [];
  });

  useEffect(() => {
    localStorage.setItem("myTeam", JSON.stringify(myTeam));
  }, [myTeam]);

  const toUpperFirstLetter = (name) => {
    return name
      .split(" ")
      .map((letra) => letra[0].toUpperCase() + letra.slice(1))
      .join(" ");
  };

  async function fetchPokemons(nome) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

      if (!response.ok) throw new Error("Pokémon não encontrado");

      const entrie = await response.json();
      const responseDescription = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${nome}`
      );
      const description = await responseDescription.json();
      const descriptionText = description.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      const InPortuguese = await translate(descriptionText.flavor_text, "pt");

      const infos = {
        id: entrie.id.toString().padStart(3, "0"),
        name: toUpperFirstLetter(entrie.name),
        types: entrie.types.map((typeName) => typeName.type.name),
        image: entrie.sprites.other["official-artwork"].front_default,
        description: InPortuguese,
        weight: entrie.weight,
        height: entrie.height,
        stats: entrie.stats,
        abilities: entrie.abilities.map((abilityName) => abilityName.ability.name)
      };
      setDataPokemon(infos);
    } catch (error) {
      alert(error.message);
      setInputValue("");
    }
  }

  const addEntrieInMyTeam = () => {
    try {
      const pokemonExistInTeam = myTeam.find((pokemon) => pokemon.name === dataPokemon.name);

      if (pokemonExistInTeam) throw new Error("Pokémon já está em seu time");

      setMyTeam([...myTeam, dataPokemon]);
    } catch (error) {
      alert(error.message);
    }
  };

  const removePokemonMyTeam = (pokemon) => {
    const isOk = confirm("Deseja mesmo remover?");
    if (isOk) {
      const filteredPokemons = myTeam.filter((poke) => poke.name !== pokemon.name);
      setMyTeam(filteredPokemons);
    }
  };


  const handleClick = (pokemon) => {
    const pokemonInMyTeam = myTeam.some((teamMember) => teamMember.id === pokemon.id);
    setDataPokemon(pokemon);
    setStatePopUp(true);
    setShowAddButton(!pokemonInMyTeam); // Se estiver no time, não mostra o botão
  };


  const closePopUp = () => {
    setStatePopUp(false); // Fecha o pop-up
    setDataPokemon({}); // Opcional: limpa os dados do Pokémon exibido
  };



  const isEmptyDataPokemon = (obj) => Object.keys(obj).length === 0;
  const isEmptyMyTeam = (verifMyTeam) => verifMyTeam.length === 0;

  return (
    <div className="bg-slate-300 min-h-screen w-full relative">
      {statePopUp && (
        <PopUpPokemon
          id={dataPokemon.id}
          name={dataPokemon.name}
          types={dataPokemon.types || []}
          description={dataPokemon.description}
          image={dataPokemon.image}
          weight={dataPokemon.weight}
          height={dataPokemon.height}
          stats={dataPokemon.stats}
          abilities={dataPokemon.abilities || []}
          onClickExit={closePopUp}
          onClickAdd={addEntrieInMyTeam}
          showAddButton={showAddButton} // Passa a flag para controlar a exibição do botão
        />
      )}


      <img src={imgLogo} className="m-auto lg:w-96 w-3/6" />

      <div className="m-auto max-w-4xl p-3 flex flex-col md:flex-row justify-around">
        <div className="space-y-3 mb-4">
          <SearchSide
            value={inputValue}
            setValue={setInputValue}
            onClick={() => {
              fetchPokemons(inputValue.toLowerCase());
            }}
          />

          <CardPokemon
            isEmpty={isEmptyDataPokemon(dataPokemon)}
            onClickHeart={addEntrieInMyTeam}
            onClickVerMais={() => handleClick(dataPokemon)} // Passa o Pokémon para o pop-up
            id={dataPokemon.id}
            name={dataPokemon.name}
            types={dataPokemon.types || []}
            description={dataPokemon.description}
            image={dataPokemon.image}
          />

        </div>

        <div className="flex md:justify-end justify-center gap-3 relative pt-10 flex-wrap">
          <h1 className="text-2xl font-bold absolute top-0 left-0 md:left-auto">My Team</h1>

          {isEmptyMyTeam(myTeam) ? (
            <div className="flex gap-1 font-semibold">
              <h1>SEU TIME ESTÁ VAZIO</h1>
              <BookmarkX />
            </div>
          ) : (
            myTeam.map((pokemon) => (
              <CardPokemon
                key={pokemon.id}
                itemInMyTeam={true}
                id={pokemon.id}
                name={pokemon.name}
                types={pokemon.types}
                description={pokemon.description}
                image={pokemon.image}
                onClickVerMais={() => handleClick(pokemon)}
                onClickRemovePokemon={() => removePokemonMyTeam(pokemon)} // Passa o Pokémon específico aqui
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default App;
