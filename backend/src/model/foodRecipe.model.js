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
                text: `INSERT INTO recipes (title, ingredients, video, photo, user_id, photo_pub_id, photo_url, photo_secure_url)
                        VALUES
                        ($1, $2 ,$3 ,$4, $5, $6, $7, $8)`,
                values: [data.title, data.ingredients, data.video, data.photo, data.user_id, data.photo_pub_id, data.photo_url, data.photo_secure_url]
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
    searchRecipe: (data) => {
        return new Promise((resolve, reject) => {
            console.log(data)
            const query = {
                text: `SELECT * FROM recipes where title ILIKE $1 ORDER BY title ${data.sortby}`,
                values: [`%${data.title}%`]
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
                text: `
                SELECT recipes.*, users.photo as ava_users, users.name, users.email FROM recipes 
                JOIN users ON recipes.user_id = users.id_user
                where id_recipes = $1`,
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
                        photo_pub_id = coalesce($5, photo_pub_id),
                        photo_url = coalesce($6, photo_url),
                        photo_secure_url = coalesce($7, photo_secure_url),
                        updated_at = $8
                        WHERE id_recipes = $9`,                
                values: [data.title, data.ingredients, data.video, data.photo, data.photo_pub_id, data.photo_url, data.photo_secure_url, updated_at, data.id],
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
                text: `DELETE FROM recipes WHERE id_recipes = $1`,
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
