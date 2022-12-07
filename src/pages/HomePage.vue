<template>
  <div class="row">
    <!-- SECTION Change Page Buttons and Pokemon List -->
    <div
      class="col-md-4 bg-danger pt-4 d-flex flex-column justify-content-between"
    >
      <div class="row">
        <div class="col-md-6">
          <button
            :disabled="!previousPage"
            @click="changePage(previousPage)"
            class="btn btn-outline-light w-50"
          >
            Previous
          </button>
        </div>

        <div class="col-md-6">
          <button
            :disabled="!nextPage"
            @click="changePage(nextPage)"
            class="btn btn-outline-light w-50"
          >
            Next
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center" v-for="p in pokemon" :key="p.name">
          <button
            class="btn btn-outline-light text-uppercase w-75 mb-1"
            @click="setActive(p.url)"
          >
            {{ p.name }} <i class="mdi mdi-pokeball"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- SECTION Active Pokemon -->

    <div class="col-md-8 bg-img">
      <div class="row">
        <div
          v-if="activePokemon"
          class="
            col-md-12
            d-flex
            flex-column
            align-items-center
            justify-content-center
          "
        >
          <h1 class="text-uppercase">{{ activePokemon.name }}</h1>
          <img :src="activePokemon.img" alt="active poke" />
          <p class="fs-3">
            Height:{{ activePokemon.height }} | Weight:
            {{ activePokemon.weight }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { pokemonService } from "../services/PokemonService";
import { AppState } from "../AppState";

export default {
  setup() {
    onMounted(async () => {
      try {
        await pokemonService.getPokemon();
      } catch (error) {
        console.error(error);
      }
    });
    return {
      pokemon: computed(() => AppState.pokemon),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      activePokemon: computed(() => AppState.activePokemon),

      // NOTE Might be important for Friday or not 😉

      async changePage(url) {
        try {
          await pokemonService.changePage(url);
        } catch (error) {
          console.log(error);
        }
      },

      async setActive(url) {
        try {
          await pokemonService.setActive(url);
        } catch (error) {
          console.log(error);
        }
      },
    };
  },
};
</script>

<style scoped lang="scss">
.bg-img {
  background-image: url("https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/masters/city.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
