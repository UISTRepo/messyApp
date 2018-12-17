import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Globalization } from '@ionic-native/globalization/ngx';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private globalization: Globalization,
        private translate: TranslateService,
        private storage: Storage
    ) {
        this.initializeApp();
    }

    initializeApp() {

        // this.translate.setDefaultLang('en');

        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.storage.get('messyApp.lang').then((lang) => {
                if(lang){
                    this.translate.setDefaultLang(lang);
                }
                else{
                    if(this.platform.is('cordova')){
                        this.globalization.getPreferredLanguage().then((res: any) => {
                            let lang = res.value.split('-')[0];
                            this.storage.set('messyApp.lang', lang);
                            this.translate.setDefaultLang(lang);
                        });
                    }
                    else{
                        this.translate.setDefaultLang('en');
                        this.storage.set('messyApp.lang', 'en');
                    }
                }
            });



        });
    }
}
