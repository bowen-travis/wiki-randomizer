import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-article-viewing-block',
    templateUrl: './article-viewing-block.component.html',
    styleUrls: ['./article-viewing-block.component.css']
})

export class ArticleViewingBlockComponent implements OnInit {

    displayUrl = "";

    updateDisplayURL(url) {
        this.displayUrl = url;
    }

}
