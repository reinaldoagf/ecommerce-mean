import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//components
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { LoggedInComponent } from "./logged-in/logged-in.component";
import { UserProfileComponent } from "./logged-in/user-profile/user-profile.component";
import { MyproductsComponent } from "./logged-in/myproducts/myproducts.component";
// import { ProductComponent } from "./logged-in/product/product.component";
//other
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: "signup",
    component: UserComponent,
    children: [{ path: "", component: SignUpComponent }]
  },
  {
    path: "login",
    component: UserComponent,
    children: [{ path: "", component: SignInComponent }]
  },
  {
    path: "profile",
    component: LoggedInComponent,
    canActivate: [AuthGuard],
    children: [{ path: "", component: UserProfileComponent }]
  },
  {
    path: "myproducts",
    component: LoggedInComponent,
    canActivate: [AuthGuard],
    children: [{ path: "", component: MyproductsComponent }]
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
