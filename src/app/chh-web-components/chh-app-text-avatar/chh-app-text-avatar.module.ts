import { NgModule } from "@angular/core";
import { ChhAppTextAvatarDirective } from './chh-app-text-avatar';
import { CommonModule } from '@angular/common';
import { ColorGenerator } from './color-generator';

@NgModule({
  imports: [CommonModule],
  declarations: [ChhAppTextAvatarDirective],
  exports: [ChhAppTextAvatarDirective],
  providers: [ColorGenerator]
})
export class ChhAppTextAvatarModule {}
