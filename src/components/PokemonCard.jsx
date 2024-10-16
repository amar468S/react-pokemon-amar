export const PokemonCard = ({pokemon}) => {
    return(
        <>
            <figure>
                <img
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt={pokemon.name}
                    className="pokemon-image"
                />
            </figure>
            <h1 className="pokemon-name">{pokemon.name}</h1>
            <div className="pokemon-info pokemon-highlight">
                <p>
                    {
                        (pokemon.types.map((currMap) => {
                            return currMap.type.name
                        })).join(", ")
                    }
                </p>
            </div>
            <div className="grid-three-cols">
                <p className="pokemon-info">
                    Height : <span>{pokemon.height}</span>
                </p>
                <p className="pokemon-info">
                    Weight : <span>{pokemon.weight}</span>
                </p>
                <p className="pokemon-info">
                    Speed : <span>{pokemon.stats[5].base_stat}</span>
                </p>
            </div>
            <div className="grid-three-cols">
                <p className="pokemon-info">
                    Experience : <span>{pokemon.base_experience}</span>
                </p>
                <p className="pokemon-info">
                    Attack : <span>{pokemon.stats[1].base_stat}</span>
                </p>
                <p className="pokemon-info">
                    Abilities : <span>
                        {
                            (pokemon.abilities.map((currAbility)=>{
                                return (currAbility.ability.name);
                            })).join(", ")
                        }
                    </span>
                </p>
            </div>
        </>
    )
}