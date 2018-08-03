import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { HOST_URL } from './config';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
// import 'add/rxjs.opera..../filter'

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
    public imageList: ImageModel[] = [];
    private imageDataset: ImageModel[] = [];

    constructor() { }

    ngOnInit() {
        let randomNo: number = Math.floor((Math.random() * 7) + 3);
        this.src = HOST_URL + randomNo + '.jpg';

        if (!navigator.onLine) {
            this.button = this.buttonOffline;
        }
        this.setImages();
    }
    // this will create a image list with the relevant ids
    private setImages() {
        let imagesNumbers: number[] = [4, 7, 3];

        imagesNumbers.forEach(element => {
            let url = HOST_URL + element + '.jpg';
            this.imageDataset.push({
                url: url,
                id: element,
            });
        });
        console.log(this.imageDataset);
        this.createObservable();
    }

    private createObservable() {
        let result = from(this.imageDataset);
        result
            .pipe(
                filter(item => item.id < 5)
            )
            .subscribe(item => {
                this.imageList.push(item);
            });
    }


    public generateSrc(): void {
        if (navigator.onLine) {
            const randomNo: number = Math.floor((Math.random() * 7) + 3);
            this.src = HOST_URL + randomNo + '.jpg';
        } else {
            this.button = this.buttonOffline;
        }
    }
}

export interface ImageModel {
    url: string;
    id: number;
}
