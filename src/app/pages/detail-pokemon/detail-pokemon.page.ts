import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonFab, IonFabButton, IonIcon,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonGrid, IonRow, IonCol, IonText, IonImg, IonProgressBar,
  LoadingController
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { SPokemon } from '../../services/pokemon.service';
import { IPokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonFab, IonFabButton, IonIcon,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonGrid, IonRow, IonCol, IonText, IonImg, IonProgressBar,
    CommonModule, FormsModule
  ]
})
export class DetailPokemonPage {

  @Input() id: number = 0;

  private ruta = inject(ActivatedRoute);
  private servicePokemon: SPokemon = inject(SPokemon);
  private loadingController: LoadingController = inject(LoadingController);
  private router: Router = inject(Router);

  pokemon: IPokemon | undefined;

  constructor() {
    addIcons({ closeOutline });
  }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    loading.present();
    console.log('El id es: ' + this.ruta.snapshot.params['id']);
    this.servicePokemon.getPokemonById(this.ruta.snapshot.params['id'])
      .then((pokemon: IPokemon) => this.pokemon = pokemon)
      .finally(() => {
        loading.dismiss();
      });
  }

  goBack() {
    this.router.navigateByUrl('list-pokemons');
  }

  toNumber(value: string): number {
    return Number(value);
  }
}