import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { HOST_URL } from './config'

class EmblaImage {
  message: string;
  fontsize: number;
}

class Button {
  text: string;
  disabled: boolean;
  color: string;
}

@Component({
  selector: 'app-img-card',
  templateUrl: './img-card.component.html',
  styleUrls: ['./img-card.component.css']
})
export class ImgCardComponent implements OnInit {

  private image: EmblaImage = {
    message: 'Embla Extended Family',
    fontsize: 40
  };

  public buttonOnline: Button = {
    text: 'Give me another image',
    color: 'primary',
    disabled: false
  };

  public buttonOffline: Button = {
    text: 'Sorry, you\'re offline',
    color: 'primary',
    disabled: true
  };

  public button: Button = this.buttonOnline;
  public src: string;

  constructor() { }

  ngOnInit() {
    var randomNo: number = Math.floor((Math.random() * 7) + 3);
    this.src = HOST_URL + randomNo + '.jpg';

    if (!navigator.onLine) {
      this.button = this.buttonOffline;
    }
  }

  public generateSrc(): void {
    if (navigator.onLine) {
      var randomNo: number = Math.floor((Math.random() * 7) + 3);
      this.src = HOST_URL + randomNo + '.jpg';
    }
    else {
      this.button = this.buttonOffline;
    }
  }
}
