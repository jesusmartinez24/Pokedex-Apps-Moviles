import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonGrid, IonRow, IonCol, IonCard, IonCardContent,
  IonImg, IonText, IonInfiniteScroll, IonInfiniteScrollContent,
  LoadingController, InfiniteScrollCustomEvent
} from '@ionic/angular/standalone';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { IPokemon } from '../../interfaces/pokemon';
import { SPokemon } from '../../services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonGrid, IonRow, IonCol, IonCard, IonCardContent,
    IonImg, IonText, IonInfiniteScroll, IonInfiniteScrollContent,
    CommonModule, FormsModule
  ]
})
export class ListPokemonsPage {

  private pokemonService: SPokemon = inject(SPokemon);
  private router: Router = inject(Router);
  pokemons: IPokemon[] = [];

  constructor(private loadingCtroller: LoadingController) { }

  ionViewWillEnter() {
    this.getMorePokemons();
  }

  // Corregido: Ahora apunta a 'detail-pokemon' coincidiendo con app.routes.ts
  goToPage(pokemon: IPokemon) {
    this.router.navigate(['detail-pokemon', pokemon.id]);
  }

  async getMorePokemons(event?: InfiniteScrollCustomEvent) {
    const promisePokemons = this.pokemonService.getPokemons();

    if (promisePokemons) {
      let loading: any;
      if (!event) {
        loading = await this.loadingCtroller.create({
          message: 'Cargando...',
        });
        loading.present();
      }

      promisePokemons.then((pokemons: IPokemon[] | null) => {
        if (pokemons) {
          this.pokemons = this.pokemons.concat(pokemons);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        loading?.dismiss();
        event?.target.complete();
      });
    }
  }
}