import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
})
export class ListPokemonsPage implements OnInit {
  public pokemons: Pokemon[];
  constructor(
    private ps: PokemonService,
    public loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
    this.pokemons = [];
  }

  ngOnInit() {
    this.morePokemon();
  }
  async morePokemon($event = null) {
    const promise = this.ps.getPokemons();

    if (promise) {
      let loading = null;
      if (!$event) {
        loading = await this.loadingCtrl.create({
          message: 'Veuillez patienter !',
          duration: 2000,
        });

        await loading.present();
      }
      // const { role, data } = await loading.onDidDismiss();
      // console.log('Loading dismissed')

      promise
        .then(async (result: Pokemon[]) => {
          this.pokemons = this.pokemons.concat(result);
          this.pokemons = this.pokemons.sort((p1, p2) => p1.id - p2.id);
          console.log(this.pokemons);

          if ($event) {
            $event.target.complete();
          }
          if (loading) {
            loading.dismiss();
          }
        })
        .catch((error) => {
          console.error(error);
          if ($event) {
            $event.target.complete();
          }
          if (loading) {
            loading.dismiss();
          }
        });
    }
  }

  goToDetail(pokemon: Pokemon) {
    this.navParams.data.pokemon = pokemon;
    this.navCtrl.navigateForward('detail-pokemon');
  }
}
