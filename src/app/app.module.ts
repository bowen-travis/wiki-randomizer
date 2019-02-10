import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { LanguageSelectionBlockComponent } from './language-selection-block/language-selection-block.component';
import { SiteSelectionBlockComponent } from './site-selection-block/site-selection-block.component';
import { ArticleViewingBlockComponent } from './article-viewing-block/article-viewing-block.component';
import { SafeUrlPipe } from './safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SiteSelectionBlockComponent,
    LanguageSelectionBlockComponent,
    ArticleViewingBlockComponent,
    SafeUrlPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
