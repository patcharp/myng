import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeService } from './_services/home.service';


@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        SharedModule,
        HomeRoutingModule
    ],
    providers: [
        HomeService,
    ]
})
export class HomeModule { }
