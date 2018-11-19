import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateHighlightPage } from './create-highlight';

@NgModule({
  declarations: [
    CreateHighlightPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateHighlightPage),
  ],
})
export class CreateHighlightPageModule {}
