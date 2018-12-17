import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    myImage: string;

    selectedLang: string;

    constructor(
        public translate: TranslateService,
        private storage: Storage
    ){

        this.storage.get('messyApp.lang').then(lang => {
            this.selectedLang = lang;
        });

    }

    changeLanguage(lang){
        this.storage.set('messyApp.lang', lang);
        this.translate.setDefaultLang(lang);
    }

}
