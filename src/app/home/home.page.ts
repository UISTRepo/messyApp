import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    myImage: string;

    selectedLang: string;

    gallery: any = [];

    constructor(
        public translate: TranslateService,
        private storage: Storage,
        public camera: Camera
    ){

        this.storage.get('messyApp.lang').then(lang => {
            if(lang)
                this.selectedLang = lang;
            else{
                this.selectedLang = 'en';
            }
        });

        this.storage.get('messyApp.gallery').then(data => {
            if(data){
                this.gallery = data;
            }
        });

    }

    changeLanguage(lang){
        this.storage.set('messyApp.lang', lang);
        this.translate.setDefaultLang(lang);
    }

    takePicture(){

        const options: CameraOptions = {
            quality: 100,
            targetWidth: 700,
            targetHeight: 700,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA
        };

        this.camera.getPicture(options).then((imageData) => {

            let image = 'data:image/jpeg;base64,' + imageData;
            this.gallery.push(image);
            this.storage.set('messyApp.gallery', this.gallery);
        }, (err) => {
            // Handle error
        });

    }

}
