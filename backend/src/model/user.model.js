// declare db
const db = require("../config/db");

const userModel = {
  // router model list
  selectAll: () => {
    return new Promise((resolve, reject) => {
      const query = {
        text: "SELECT * FROM users ORDER by name ASC",
      };

      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  // user create user
  createUser: (name, email, password, phone) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `INSERT INTO users 
                            (name, email, password, phone)
                            VALUES ($1, $2, $3, $4)`,
        values: [name, email, password, phone],
      };

      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  register: ({ name, email, password, phone }) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `INSERT INTO users 
                            (name, email, password, phone)
                            VALUES ($1, $2, $3, $4)`,
        values: [name, email, password, phone],
      };

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
  searchUser: (getName) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `SELECT * FROM users WHERE name ILIKE $1`,
        values: [`%${getName}%`],
      };
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
        text: `SELECT * FROM users WHERE id = $1`,
        values: [id],
      };
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  editUser: ({ id, name, email, phone, photo }) => {
    return new Promise((resolve, reject) => {
      const updated_at = "now()";
      const query = {
        text: `UPDATE users SET 
                        name = coalesce($1, name), 
                        email = coalesce($2, email), 
                        phone = coalesce($3, phone), 
                        photo = coalesce($4, photo), 
                        photo_pub_id = coalesce($5, photo_pub_id),
                        photo_url = coalesce($6, photo_url),
                        photo_secure_url = coalesce($7, photo_secure_url),
                        updated_at = $8 
                        where id_user = $9`,
        values: [name, email, phone, photo, updated_at, id],
      };
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `DELETE FROM users WHERE id = $1`,
        values: [id],
      };
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  // implementation of pagination
  sorting: (perPage, offset) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `SELECT * FROM users order by id ASC LIMIT $1 OFFSET $2`,
        values: [perPage, offset],
      };
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: `SELECT * FROM users WHERE email = $1`,
        values: [email],
      };
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};
module.exports = userModel;
