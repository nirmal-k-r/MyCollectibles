# Agenda
--------
- Setting up server script ✅
    - Listen to ip and ports✅
- Setup config script✅
    - Database config for later✅
- Install nodemon✅
- Setup up Express application✅
    - Setup app.js ✅
    - Setup the component folders✅
    - Create all other configuration folders✅
    - Create and link routers ✅
    - Connect our templates (views) directory ✅
    - Connect our public/static directory c
    - Setup middleware ✅
    - Setup our error handling ✅
- Create our first route ✅
- Respond to our first request ✅
- Render first template ✅
    - Pass data in the context and use in the ejs ✅



# Setup
port=3000
domain= http://localhost or http://127.0.0.1

### Enter in browser
http://localhost:3000/


### Routes
- /
- /about
- /admin
- /auth/logins


### Routers
- Group multiple routes togeher
- Authentication router
    - /auth/
    - /auth/login
    - /auth/register
    - /auth/forgot-password
- need to be connected to your application via a common base route (/auth)



### components
 - home
 - auth
 - admin


 ### Http Request types
  - GET
  - POST
  - PUT
  - PATCH
  - DELETE




  # Cart and checkout
    - chekout page
        - GET /checkout
        - POST /checkout - DUMMY PAYMENT and save to database
    - cart
        - EJS
            - cart.ejs - Modal (popup cart)
            - Add cart button to the navbar
        - Routes
            - GET /cart - get cart contents
            - POST /cart/add - add item to cart (prod_id,qty)
            - DELETE /cart/delete - delete item from cart
            - POST /cart/update - update cart (qty)

