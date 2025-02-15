const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "lightbnb",
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [email])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];  // Return the first user found
      } else {
        return null;  // No user found, return null
      }
    })
    .catch((err) => {
      console.log(err.message);
      return null;  // Return null in case of an error
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1 LIMIT 1`, [id])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];  // Return the first user found
      } else {
        return null;  // No user found, return null
      }
    })
    .catch((err) => {
      console.log(err.message);
      return null;  // Return null in case of an error
    });
};


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const { name, email, password } = user;

  return pool
    .query(
      `INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING *;`, 
      [name, email, password]
    )
    .then((result) => {
      const newUser = result.rows[0]; // The inserted user object
      return newUser; // Return the new user object including the id
    })
    .catch((err) => {
      console.log(err.message);
      return null; // In case of error, return null
    });
};


/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(
      `SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, 
              reservations.end_date, AVG(property_reviews.rating) as average_rating
       FROM reservations
       JOIN properties ON reservations.property_id = properties.id
       LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
       WHERE reservations.guest_id = $1
       GROUP BY reservations.id, properties.id
       ORDER BY reservations.start_date
       LIMIT $2;`,
      [guest_id, limit]
    )
    .then((result) => {
      return result.rows; 
    })
    .catch((err) => {
      console.log(err.message); 
      return []; 
    });
};


/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
  `;

  // Start building the WHERE clause based on options
  let whereClauseAdded = false;

  // Check if a city is provided and add to query
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
    whereClauseAdded = true;
  }

  // Check if an owner_id is provided and add to query
  if (options.owner_id) {
    if (whereClauseAdded) {
      queryString += `AND owner_id = $${queryParams.length + 1} `;
    } else {
      queryString += `WHERE owner_id = $${queryParams.length + 1} `;
      whereClauseAdded = true;
    }
    queryParams.push(options.owner_id);
  }

  // Check if minimum_price_per_night is provided and add to query
  if (options.minimum_price_per_night) {
    if (whereClauseAdded) {
      queryString += `AND cost_per_night >= $${queryParams.length + 1} `;
    } else {
      queryString += `WHERE cost_per_night >= $${queryParams.length + 1} `;
      whereClauseAdded = true;
    }
    queryParams.push(options.minimum_price_per_night * 100); // Convert to cents
  }

  // Check if maximum_price_per_night is provided and add to query
  if (options.maximum_price_per_night) {
    if (whereClauseAdded) {
      queryString += `AND cost_per_night <= $${queryParams.length + 1} `;
    } else {
      queryString += `WHERE cost_per_night <= $${queryParams.length + 1} `;
      whereClauseAdded = true;
    }
    queryParams.push(options.maximum_price_per_night * 100); // Convert to cents
  }

  // Check if minimum_rating is provided and add to query
  queryString += `GROUP BY properties.id `;

if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
}

queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length + 1};
`;

  
  queryParams.push(limit);

  
  console.log(queryString, queryParams);

  // Execute the query
  return pool.query(queryString, queryParams).then((result) => result.rows);
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  // The query to insert the new property into the properties table
  const queryString = `
    INSERT INTO properties (
      owner_id, title, description, thumbnail_photo_url, cover_photo_url, 
      cost_per_night, street, city, province, post_code, country, 
      parking_spaces, number_of_bathrooms, number_of_bedrooms
    ) 
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
    ) 
    RETURNING *;
  `;

  // Parameters for the query
  const queryParams = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];

  // Execute the query and return the newly inserted property
  return pool
    .query(queryString, queryParams) // Execute the query with parameters
    .then((res) => res.rows[0]) // Return the first row (the inserted property)
    .catch((err) => {
      console.error('Error inserting property:', err.message); // Log any errors
      return null; // Return null if an error occurs
    });
};



module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
