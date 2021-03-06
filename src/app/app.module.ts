import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import {
  ModuleTranslateLoader,
  IModuleTranslationOptions
} from "@larscom/ngx-translate-module-loader";

export function ModuleHttpLoaderFactory(http: HttpClient) {
  const baseTranslateUrl = "./assets/i18n";

  const options: IModuleTranslationOptions = {
    translateError: (error, path) => {
      console.log("Oeps! an error occurred: ", { error, path });
    },
    modules: [
      // final url: ./assets/i18n/common/en.json
      { moduleName:'common', baseTranslateUrl },
      // final url: ./assets/i18n/feature1/en.json
      { moduleName: "feature1", baseTranslateUrl },
      // final url: ./assets/i18n/feature2/en.json
      { moduleName: "feature2", baseTranslateUrl }
    ]
  };
  return new ModuleTranslateLoader(http, options);
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: ModuleHttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
