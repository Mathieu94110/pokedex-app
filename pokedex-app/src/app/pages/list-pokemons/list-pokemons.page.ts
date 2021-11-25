import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
})
export class ListPokemonsPage implements OnInit {
  public pokemons: Pokemon[];
  constructor(private ps: PokemonService) {
    this.pokemons = [];
  }

  ngOnInit() {
    this.morePokemon();
  }
  morePokemon() {
    const promise = this.ps.getPokemons();

    if (promise) {
      promise
        .then((result: Pokemon[]) => {
          this.pokemons = this.pokemons.concat(result);
          this.pokemons = this.pokemons.sort((p1, p2) => p1.id - p2.id);
          console.log(this.pokemons);
        })
        .catch((error) => console.error(error));
    }
  }
}
