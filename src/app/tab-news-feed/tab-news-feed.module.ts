import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabNewsFeedPageRoutingModule } from './tab-news-feed-routing.module';

import { TabNewsFeedPage } from './tab-news-feed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabNewsFeedPageRoutingModule,
  ],
  declarations: [TabNewsFeedPage],
})
export class TabNewsFeedPageModule {}
