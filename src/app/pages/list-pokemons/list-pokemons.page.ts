import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
  IonImg, IonText, LoadingController 
} from '@ionic/angular/standalone';
import { inject } from '@angular/core';
import { IPokemon } from '../../interfaces/pokemon';
// 👇 1. Cambio en el import del servicio
import { SPokemon } from '../../services/pokemon.service'; 

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonGrid, IonRow, IonCol, IonCard, IonCardContent,
    IonImg, IonText, CommonModule, FormsModule
  ]
})
export class ListPokemonsPage {

  // 👇 2. Cambio en la inyección de la dependencia
  private pokemonService: SPokemon = inject(SPokemon); 

  pokemons: IPokemon[] = [];

  constructor(private loadingCtroller: LoadingController) { }

  ionViewWillEnter() {
    this.getMorePokemons();
  }

  async getMorePokemons() {
    const promisePokemons = this.pokemonService.getPokemons();

    if (promisePokemons) {
      const loading = await this.loadingCtroller.create({
        message: 'Cargando...',
      });

      await loading.present();

      promisePokemons.then((pokemons: IPokemon[] | null) => {
        if (pokemons) {
          this.pokemons = this.pokemons.concat(pokemons);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        loading.dismiss();
      });
    }
  }
}