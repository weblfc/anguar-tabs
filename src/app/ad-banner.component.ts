import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { AdDirective } from './ad.directive';
import { AdItem } from './ad-item';
import { AdComponent } from './ad.compenent';

@Component({
    selector: 'app-ad-banner',
    template: `
              <div class="ad-banner-example">

              <button (click)="add(0)">11</button>
              <button (click)="add(1)">22</button>
              <button (click)="add(2)">33</button>
              <button (click)="add(3)">44</button>
                <ng-template adHost></ng-template>
              </div>
            `
})
export class AdBannerComponent implements OnInit, OnDestroy {
    @Input() ads: AdItem[] = [];
    currentAdIndex = -1;
    @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;
    interval: any;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.add(0)
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    loadComponent() {
        this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
        const adItem = this.ads[this.currentAdIndex];
        console.log(this.ads)
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent<AdComponent>(componentFactory);
        componentRef.instance.data = adItem.data;
    }
    add(value: number) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.ads[value].component);

        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent<AdComponent>(componentFactory);
        componentRef.instance.data = this.ads[value].data;
    }
}