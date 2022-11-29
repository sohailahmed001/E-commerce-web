import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { AdminComponent } from './components/admin/admin.component';
import { BuyProductComponent } from './components/buy-product/buy-product.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { ProductViewDetailsComponent } from './components/product-view-details/product-view-details.component';
import { ShowProductDetailsComponent } from './components/show-product-details/show-product-details.component';
import { UserComponent } from './components/user/user.component';
import { BuyProductResolveService } from './services/buy-product-resolve.service';
import { ProductResolveService } from './services/product-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'add-new-product',
    component: AddNewProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
    resolve: {
      product: ProductResolveService,
    },
  },
  {
    path: 'show-product-details',
    component: ShowProductDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'product-view-details',
    component: ProductViewDetailsComponent,
    resolve: {
      product: ProductResolveService,
    },
  },
  {
    path: 'buy-product',
    component: BuyProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
    resolve: {
      productDetails: BuyProductResolveService,
    },
  },
  {
    path: 'order-confirm',
    component: OrderConfirmationComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
