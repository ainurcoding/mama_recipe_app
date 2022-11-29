// declare db
const db = require('../config/db');

const foodRecipe = {
    // router model list
    selectAll: () => {
        return new Promise((resolve, reject) => {
            const query = {
                text: 'SELECT * FROM  recipes ORDER BY title ASC'
            }
            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    },
    // model for get recipes by id user (spesifik for user)
    listRecipeUser: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM recipes WHERE user_id = ${id}`, (err, res) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
    },
    // user create user
    createRecipe: (data) => {
        return new Promise((resolve, reject) => {
            const query = {
                text: `INSERT INTO recipes (title, ingredients, video, photo, user_id)
                        VALUES
                        ($1, $2 ,$3 ,$4, $5)`,
                values: [data.title, data.ingredients, data.video, data.photo, data.user_id]
            }
            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    },

    // router spesifik search

    // usahakan parameter didalamnya jangan sama dengan nama field table   
    searchRecipe: (title) => {
        return new Promise((resolve, reject) => {
            const query = {
                text: `SELECT * FROM recipes where title ILIKE $1`,
                values: [`%${title}%`]
            }
            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    },
    // by id
    selectDetail: (id) => {
        return new Promise((resolve, reject) => {
            const query = {
                text: `SELECT * FROM recipes where id =$1`,
                values: [id],
            }
            db.query(query , (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            })
        })
    },
    editRecipe: (data) => {
        return new Promise((resolve, reject) => {
            const updated_at = 'now()';
            const query = {
                text: `UPDATE recipes SET 
                        title = coalesce($1, title), 
                        ingredients = coalesce($2, ingredients), 
                        video = coalesce($3, video), 
                        photo  = coalesce($4, photo),
                        updated_at = $5
                        WHERE id_recipes = $6`,
                values: [data.title, data.ingredients, data.video, data.photo, updated_at, data.id],
            }
            db.query(query , (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = {
                text: `DELETE FROM recipes WHERE id = $1`,
                values: [id],
            }
            db.query(query ,(err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
        })
    },
    // implementation of pagination
    sorting: (perPage, offset) => {
        return new Promise((resolve, reject) => {
            const query = {
                text: `SELECT * FROM  recipes ORDER BY id ASC LIMIT $1 OFFSET $2`,
                values: [perPage, offset],
            }
            db.query(query ,(err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
        })
    }
};
module.exports = foodRecipe;
