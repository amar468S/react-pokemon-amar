import { useEffect, useState } from "react"
import { PokemonCard } from "./PokemonCard";

export const Pokemon = () =>{
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const API = "https://pokeapi.co/api/v2/pokemon/?limit=100&offset=20";

    // Using fetch in async wait try catch
    const fetchPokemon = async() =>{
        try {
            const res = await fetch(API);
            const data = await res.json();
            // Will return promises after aync and await
            const detailedPokemonData = data.results.map(async (currPokemon)=>{
                const res = await fetch(currPokemon.url);
                const data = await res.json();
                return data;
            });
            
            // To resolve all the promises
            const detailedResponses = await Promise.all(detailedPokemonData);
            setPokemon(detailedResponses);
            setLoading(false)
        }catch(error){
            setError(error);
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchPokemon();
    }, []);

    if(loading){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if(error){
        return (
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }

    const searchPokemonData = pokemon.filter((currPokemon)=>currPokemon.name.includes(search));
   
    return (
        <>
            {
                pokemon && 
                <section className="container">
                    <header>
                        <h1><img src="./pokeapi_256.3fa72200.png" alt="pokemon api image" /></h1>
                        <h1>Let's catch a Pokemon</h1>
                    </header>
                    <div className="pokemon-search">
                        <input type="text" placeholder="Search pokemon" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <ul className="cards">
                        {
                            searchPokemonData.map((currPokemon)=>{
                                return (
                                    <div>
                                        <li className="pokemon-card">
                                            <PokemonCard key={currPokemon.id} pokemon={currPokemon}/>
                                        </li>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </section>
            }
        </>
    )
}