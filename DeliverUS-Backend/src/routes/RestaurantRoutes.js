import OrderController from '../controllers/OrderController.js'
import ProductController from '../controllers/ProductController.js'
import RestaurantController from '../controllers/RestaurantController.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import { isLoggedIn, hasRole } from '../middlewares/AuthMiddleware.js'
import { checkEntityExists } from '../middlewares/EntityMiddleware.js'
import { handleFilesUpload } from '../middlewares/FileHandlerMiddleware.js'
import * as ProductValidation from '../controllers/validation/ProductValidation.js'
import * as RestaurantMiddleware from '../middlewares/RestaurantMiddleware.js'
const loadFileRoutes = function (app) {
  app.route('/restaurants')
    .get(
      RestaurantController.index)
    .post(
      
    // TODO: Add needed middlewares
    isLoggedIn,
    hasRole('owner'),
    handleFilesUpload(['image'], process.env.PRODUCTS_FOLDER),
    ProductValidation.create,
    handleValidation,
    RestaurantMiddleware.checkRestaurantOwnership,
    RestaurantController.create)

  app.route('/restaurants/:restaurantId')
    .get(RestaurantController.show)
    .put(
    // TODO: Add needed middlewares
    isLoggedIn,
    hasRole('owner'),
    RestaurantMiddleware.checkRestaurantOwnership,
      RestaurantController.update)
    .delete(
      isLoggedIn,
      hasRole('owner'),
      RestaurantMiddleware.checkRestaurantOwnership,
    // TODO: Add needed middlewares
      RestaurantController.destroy)

  app.route('/restaurants/:restaurantId/orders')
    .get(
    // TODO: Add needed middlewares
    isLoggedIn,
    hasRole('owner'),
    handleFilesUpload(['image'], process.env.PRODUCTS_FOLDER),
    RestaurantMiddleware.checkRestaurantOwnership,
    handleValidation,
      OrderController.indexRestaurant)

  app.route('/restaurants/:restaurantId/products')
    .get(
    // TODO: Add needed middlewares
    isLoggedIn,
    hasRole('user'),
    handleFilesUpload(['image'], process.env.PRODUCTS_FOLDER),
    handleValidation,
      ProductController.indexRestaurant)

  app.route('/restaurants/:restaurantId/analytics')
    .get(
    // TODO: Add needed middlewares
    isLoggedIn,
    hasRole('owner'),
    
    RestaurantMiddleware.checkRestaurantOwnership,
    handleValidation,
      OrderController.analytics)
}
export default loadFileRoutes
