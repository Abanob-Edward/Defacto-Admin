import { Routes } from '@angular/router';
import { AddProductComponent } from './components/Products/add-product/add-product.component';
import { DeleteProductComponent } from './components/Products/delete-product/delete-product.component';
import { UpdateProductComponent } from './components/Products/update-product/update-product.component';
import { GetAllProductsComponent } from './components/Products/get-all-products/get-all-products.component';
import { UpdateCategoryComponent } from './components/Categories/update-category/update-category.component';
import { GetAllCategoriesComponent } from './components/Categories/get-all-categories/get-all-categories.component';
import { AddCategoryComponent } from './components/Categories/add-category/add-category.component';
import { LoginComponent } from './components/login/login.component';

import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './auth-user.guard';
import { CreateUserComponent } from './components/Users/create-user/create-user.component';
import { compileClassDebugInfo } from '@angular/compiler';
import { GetAllUsersComponent } from './components/Users/get-all-users/get-all-users.component';
import { GetAllItemsComponent } from './components/Items/get-all-items/get-all-items.component';
import { AddItemComponent } from './components/Items/add-item/add-item.component';
import { UpdateItemComponent } from './components/Items/update-item/update-item.component';
import { DeleteItemComponent } from './components/Items/delete-item/delete-item.component';
import { GetAllColorsComponent } from './components/color/get-all-colors/get-all-colors.component';
import { AddColorComponent } from './components/color/add-color/add-color.component';
import { DeleteColorComponent } from './components/color/delete-color/delete-color.component';
import { GetAllSizeComponent } from './components/Size/get-all-size/get-all-size.component';
import { AddSizeComponent } from './components/Size/add-size/add-size.component';
import { ProductInItemComponent } from './components/Items/product-in-item/product-in-item.component';
import { GetItemForOrderComponent } from './components/orders/get-item-for-order/get-item-for-order.component';
import { OrderStatusComponent } from './components/orders/order-status/order-status.component';
import { GetDefactoOrdersComponent } from './components/orders/get-defacto-orders/get-defacto-orders.component';
import { ChartComponent } from './components/Charts/chart/chart.component';
import { OrderChartComponent } from './components/Charts/chart/order-chart/order-chart.component';
import { GetReviewComponent } from './components/Review/get-review/get-review.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainComponent,
    children: [
      { path: 'Chart', component: ChartComponent },
      { path: 'OrderChart', component: OrderChartComponent },
      { path: 'GetAllProducts', component: GetAllProductsComponent },
      { path: 'CreateUser', component: CreateUserComponent },
      { path: 'GetAllUsers', component: GetAllUsersComponent },
      { path: 'AddProduct', component: AddProductComponent },
      { path: 'DeleteProduct', component: DeleteProductComponent },
      { path: 'UpdateProduct/:id', component: UpdateProductComponent },
      { path: 'update-category/:id', component: UpdateCategoryComponent },
      { path: 'AddCategory', component: AddCategoryComponent },
      { path: 'GetAllCategories', component: GetAllCategoriesComponent },
      { path: 'GetAllItems', component: GetAllItemsComponent },
      { path: 'AddItem', component: AddItemComponent },
      { path: 'UpdateItem', component: UpdateItemComponent },
      { path: 'DeleteItem', component: DeleteItemComponent },
      { path: 'GetAllColors', component: GetAllColorsComponent },
      { path: 'AddColor', component: AddColorComponent },
      { path: 'DeleteColor', component: DeleteColorComponent },
      { path: 'GetAllSize', component: GetAllSizeComponent },
      { path: 'AddSize', component: AddSizeComponent },
      { path: 'ProductInItem', component: ProductInItemComponent },
      { path: 'add-item/:id', component: AddItemComponent },
      { path: 'update-item/:id', component: UpdateItemComponent },
      { path: 'GetItemForOrder/:id', component: GetItemForOrderComponent },
      { path: 'getDefactoOrders', component: GetDefactoOrdersComponent },
      { path: 'OrderStatus/:id', component: OrderStatusComponent },
      { path: 'ProductInItem/:id', component: ProductInItemComponent },
      { path: 'GetReview', component: GetReviewComponent },
      { path: 'getDefactoOrders/:id', component: ProductInItemComponent },
    ],
  },
];
