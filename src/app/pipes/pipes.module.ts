import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { OrderbyPipe } from './orderby.pipe';


@NgModule({
  declarations: [
    FiltroPipe,
    OrderbyPipe
  ],
  exports:[FiltroPipe, OrderbyPipe]
})
export class PipesModule { }
