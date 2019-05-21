import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PaperComponent } from "./components/paper/paper.component";

const routes: Routes = [
  {
    path: "papers",
    component: PaperComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
