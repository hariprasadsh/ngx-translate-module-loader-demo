import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  template: `
    <main>    
    
      <h2>{{ 'COMMON.TITLE' | translate }}</h2>

     <div>
      <label>
        {{ 'COMMON.CHANGE_LANGUAGE' | translate }}
        <select #langSelect (change)="translate.use(langSelect.value)">
          <option *ngFor="let lang of translate.getLangs()" [value]="lang" [selected]="lang === translate.currentLang">{{ lang }}</option> 
        </select>
      </label>
     </div>

      <h3>{{ 'FEATURE1.TITLE' | translate }}</h3>

      <h3>{{ 'FEATURE2.TITLE' | translate }}</h3>  

      <div>
        <h2>Translation ({{ translate.currentLang }})</h2>
        <pre>{{ translation$ | async | json }}</pre>
      </div>

    </main>
  `
})
export class AppComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'nl']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|nl/) ? browserLang : 'en');
  }

  translation$ = this.translate.onLangChange.pipe(switchMap(({ lang }) => this.translate.getTranslation(lang)));
}
