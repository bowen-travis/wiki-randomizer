import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-article-viewing-block',
    templateUrl: './article-viewing-block.component.html',
    styleUrls: ['./article-viewing-block.component.css']
})

export class ArticleViewingBlockComponent {

    displayUrl = "http://www.wikipedia.org";

    updateDisplayURL(url) {
        if(url != "") this.displayUrl = url;
    }

}
