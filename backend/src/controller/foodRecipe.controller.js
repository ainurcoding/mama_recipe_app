const foodRecipe = require('../model/foodRecipe.model');
const {success, failed} = require("../helper/response");
const foodRecipeController = {
    // methond
    listRecipe: (req, res) => {
        foodRecipe
            .selectAll()
            .then((results) => {
                res.json(results);
            }).catch((err) => {
                res.json(err);
            });
    },
    listRecipesUser: (req, res) => {
        const id = req.params.id;

        foodRecipe.listRecipeUser(id)
        .then((results) => {
            success(res, results, "success", `success get data by id: ${id}`)
        })
        .catch((err) => {
            failed(res, err.message, "failed", `failed to get data by id: ${id}`)
        })
    },
    insertRecipe: (req, res) => {
        const photo = req.file.filename;
        
        // const { title, ingredients, video, user_id } = req.body;
        const { title, ingredients, video, user_id } = req.body;


        // const data = { photo, title, ingredients, video, user_id};
        const data = { photo, title, ingredients, video, user_id};

        foodRecipe
            .createRecipe( data )
            .then((results) => {
                success(res, results, "success", "success insert data")
            }).catch((err) => {
                failed(res, err.message, "failed", "failed insert recipes")
            });
    },

    nameRecipe: (req, res) => {
        const getTitle = req.params.title;
        foodRecipe
            .searchRecipe(getTitle)
            .then((results) => {
                res.json(results);
            }).catch((err) => {
                res.json(err);
            });
    },
    detail: (req, res) => {
        const id = req.params.id;
        foodRecipe
            .selectDetail(id).then((results) => {
                res.json(results);
            }).catch((err) => {
                res.json(err)
            })
    },
    updateRecipe: (req, res) => {
        const id = req.params.id;
        var photo;
        if(req.file){
            photo = req.file.filename;
        }
        const {  title, ingredients, video} = req.body;

        // integrated data
        const data = {
            id, photo, title, ingredients, video
        }
        foodRecipe
            .editRecipe(data)
            .then((results) => {
                success(res, results, "success", `success update data recipes by id: ${id}`)
            }).catch((err) => {
                res.json(err)
            })
    },
    deleteRecipe: (req, res) => {
        const id = req.params.id;
        foodRecipe
            .delete(id)
            .then((results) => {
                res.json(results)
            }).catch((err) => {
                res.json(err)
            })
    },
    // implementation of pagination
    sortRecipe: (req, res) => {
        const currentPage = req.query.page || 1;
        const perPage = req.query.perPage || 2;
        const offset = (currentPage - 1) * perPage;
        foodRecipe
            .sorting(perPage, offset)
            .then((results) => {
                res.json(results)
            }).catch((err) => {
                res.json(err);
            })
    }

}


module.exports = foodRecipeController;
