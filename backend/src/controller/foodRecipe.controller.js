const foodRecipe = require("../model/foodRecipe.model");
const { success, failed } = require("../helper/response");
const cloudinary = require("../helper/cloudinary");
const { selectDetail } = require("../model/foodRecipe.model");
const foodRecipeController = {
  // methond
  listRecipe: (req, res) => {
    foodRecipe
      .selectAll()
      .then((results) => {
        success(res, results.rows, "success", "success get all data");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "failed get all data");
      });
  },
  listRecipesUser: (req, res) => {
    const id = req.params.id;

    foodRecipe
      .listRecipeUser(id)
      .then((results) => {
        success(res, results, "success", `success get data by id: ${id}`);
      })
      .catch((err) => {
        failed(res, err.message, "failed", `failed to get data by id: ${id}`);
      });
  },
  insertRecipe: async (req, res) => {
    const id = req.params.id;
    let photo;

    if(req.file) {
        photo = await cloudinary.uploader.upload(req.file.path);
    }

    // const { title, ingredients, video, user_id } = req.body;
    const { title, ingredients, video, user_id } = req.body;

    // const data = { photo, title, ingredients, video, user_id};
    const data = { 
        photo, 
        title, 
        ingredients, 
        video, 
        user_id,
        photo_pub_id: photo.public_id,
        photo_url: photo.url,
        photo_secure_url: photo.secure_url
    };

    foodRecipe
      .createRecipe(data)
      .then((results) => {
        success(res, results, "success", "success insert data");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "failed insert recipes");
      });
  },

  nameRecipe: (req, res) => {
    const {title, sortBy} = req.params;
    const data = {
      title,
      sortby: sortBy || "asc"
    }
    console.log(data)
    foodRecipe
      .searchRecipe(data)
      .then((results) => {
        success(res, results, "success", `success get data with the name ${data.title}`)
      })
      .catch((err) => {
        failed(res, err.message, "failed", `failed get data with the name ${data.title}`)
      });
  },
  detail: (req, res) => {
    const id = req.params.id;
    foodRecipe
      .selectDetail(id)
      .then((results) => {
        success(res, results.rows, "success", `success get data by id: ${id}`);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  updateRecipe: async (req, res) => {
    try {
      const id = req.params.id;
      const {title, ingredients} = req.body;
      let photo;
      console.log('photo', photo)

      if(req.file) {
        photo = await cloudinary.uploader.upload(req.file.path);
      }
      

      foodRecipe
       .selectDetail(id)
       .then(async (results) => {
        const data = await results.rows[0]
        if(photo !== undefined) {
            const public_id = data.photo_pub_id;
            if(public_id !== undefined){
                await cloudinary.uploader.destroy(public_id);
            }
        }
        let photo_pub_id, photo_url, photo_secure_url;
        if(photo === undefined) {
          photo_pub_id = data.photo_pub_id
          photo_url = data.photo_url
          photo_secure_url = data.photo_secure_url
        } else {
          photo_pub_id = photo.public_id
          photo_url = photo.url
          photo_secure_url = photo.secure_url
        }
        console.log(photo)
        console.log(data)
        const updateData = {
          id,
          photo: photo || data.photo,
          title,
          ingredients,
          photo_pub_id,
          photo_url,
          photo_secure_url,
          
      }
        console.log("if lewat")

        
        console.log("update data", updateData)
        
        foodRecipe.editRecipe(updateData)
        .then((result) => {
            success(res, result, "success", `success update data by id: ${id}`);
        })
       })
       .catch((err) => {
        failed(res, err.message, "failed", `fail update id:${id}`)
       })
    } catch (err) {
      failed(res, err.message, "failed", "internal server");
    }
  },
  deleteRecipe: (req, res) => {
    const id = req.params.id;
    foodRecipe
      .delete(id)
      .then((results) => {
        success(
          res,
          results,
          "success",
          `success delete data recipes id: ${id}`
        );
      })
      .catch((err) => {
        res.json(err);
      });
  },
  // implementation of pagination
  sortRecipe: (req, res) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 2;
    const offset = (currentPage - 1) * perPage;
    foodRecipe
      .sorting(perPage, offset)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

module.exports = foodRecipeController;
