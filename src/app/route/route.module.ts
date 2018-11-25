import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouteRoutingModule
  ],
  declarations: []
})
export class RouteModule { }
// <form 
//         fxFlex.lg="80%"         
//         fxFlex.xl="80%"
//         fxFlex.md="80%"
//         fxFlex.sm="80%"
//         fxFlex.xs="100%"
//         fx.show=true
//         fx.show.xs=true class="search"><button mat-icon-button type="submit">
//         <mat-icon >search</mat-icon>
//       </button>
//       <input 
//         fxFlex.lg="80%"         
//         fxFlex.xl="80%"
//         fxFlex.md="80%"
//         fxFlex.sm="100%"
//         fxFlex.xs="100%"
//         fxFlex.xxs="100%"
//         fx.show=true
//         fx.show.xs=true type="text" placeholder="Search" 
//         ngStyle.lg="font-size:20;width:500px;" 
//         ngStyle.xl="font-size:20px"
//         ngStyle.xs="font-size:10px"
//         ngStyle.sm="font-size:10px" name="something" 
//         [(ngModel)]="searchInput" (click)="searchbutton()" (keydown)="passmessage()">
//     </form>
//     <button class="top" mat-icon-button>
//         <mat-icon fxFlex="40px" (click)=refresh(); aria-label="Side nav toggle icon" matTooltip="Refresh">refresh</mat-icon>
//       </button>
