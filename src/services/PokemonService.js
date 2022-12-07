import { AppState } from "../AppState"
import { Pokemon } from "../models/Pokemon"
import { api, pokeApi } from "./AxiosService"

class PokemonService {

    async getPokemon() {
        const res = await pokeApi.get('')
        console.log("get pokemon", res.data)
        AppState.pokemon = res.data.results
        AppState.nextPage = res.data.next
        AppState.previousPage = res.data.previous
    }

    async changePage(url) {
        const res = await api.get(url)
        console.log("change page", res.data);
        AppState.pokemon = res.data.results
        AppState.nextPage = res.data.next
        AppState.previousPage = res.data.previous
    }

    async setActive(url) {
        const res = await api.get(url)
        console.log('set active', res.data);
        AppState.activePokemon = new Pokemon(res.data)
        // console.log(AppState.activePokemon);
    }

}

export const pokemonService = new PokemonService()