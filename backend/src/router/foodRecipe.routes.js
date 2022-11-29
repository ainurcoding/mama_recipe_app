// declare express
const express = require("express");

// The following variables call several methods from the user controller
const {
  listRecipe,
  listRecipesUser,
  insertRecipe,
  nameRecipe,
  updateRecipe,
  detail,
  deleteRecipe,
  sortRecipe,
} = require("../controller/foodRecipe.controller.js");

const router = express.Router();

// require middleware
const jwtAuth = require("../middleware/jwtAuth");
const upload = require("../middleware/upload");
const removeRecipe = require("../middleware/removeRecipe");
console.log(removeRecipe);

router.get("/", (req, res) => {
  const data = "test routes";
  res.json(data);
});

router
  // // react redux
  // // endpoint cannot be the same
  // // router user
  // /**
  //  * this path handles all user data
  //  */
  // // .get('/foodRecipe', jwtAuth, listRecipe)
  // .get('/foodRecipe', jwtAuth, listRecipe)
  // .get('/foodRecipe/:title', jwtAuth, nameRecipe)
  // .get('/foodRecipe/id/:id',jwtAuth, detail)
  // .get('/foodRecipe-sort',jwtAuth, sortRecipe)
  // // .post('/foodRecipe1/insert', jwtAuth, insertRecipe)
  // .post('/foodRecipe1/insert', insertRecipe)
  // .put('/foodRecipe/update', jwtAuth,  updateRecipe)
  // .delete('/foodRecipe/delete/:id', jwtAuth, deleteRecipe)

  // // image version
  // // .post('/addRecipe', jwtAuth, upload, insertRecipe)

  // .post('/addRecipe', jwtAuth, upload, insertRecipe)
  // // delete
  // .delete('/deleteRecipe/:id', jwtAuth, removeRecipe , deleteRecipe)
  // // update
  // .put('/updateRecipe/:id', jwtAuth, removeRecipe, upload, updateRecipe);

  // react native version
  // endpoint cannot be same with other routes
  // router user
  /**
   * this path handles all user data
   */
  // .get('/foodRecipe', jwtAuth, listRecipe)

  // get all recipes
  .get("/recipes/list", listRecipe)
  .get("/recipes/user/:id", listRecipesUser)
  .post("/recipes/insert", upload, insertRecipe)
  .put("/recipes/update/:id", upload, updateRecipe)
  .get("/recipes/:title", nameRecipe)
  .get("/recipes/id/:id", detail)
  .get("/recipes-sort", sortRecipe)
  // .post('/foodRecipe1/insert', insertRecipe)
  .delete("/recipes/delete/:id", deleteRecipe)

  // image version
  // .post('/addRecipe', upload, insertRecipe)

  .post("/addRecipe", upload, insertRecipe)
  // delete
  .delete("/deleteRecipe/:id", removeRecipe, deleteRecipe)
  // update
  .put("/updateRecipe/:id", removeRecipe, upload, updateRecipe);

module.exports = router;
