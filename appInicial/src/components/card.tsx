import {Component} from '@angular/core';
import{IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent} from '@ionic/angular/standalone';

@Component({
  selector: 'autoeletrica-card',
  templateUrl: 'autoeletrica/card.html',
  styleUrl: 'autoeletrica/card.css'
  imports: [IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent]
})
export class AutoeletricaComponent {}
