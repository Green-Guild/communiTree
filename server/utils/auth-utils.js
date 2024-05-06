import bcrypt from 'bcrypt';

/** Take in a user password and return a hashed password, undefined if error
 * @param {string} password Plaintext password
 * @param {number} saltRounds How many salt rounds to use
 * @returns {Promise<string|undefined>} Hashed password
 */
export const hashPassword = async (password, saltRounds = 8) =>
  bcrypt.hash(password, saltRounds).catch((err) => console.log(err.message));

/** Check if a given password matches a given hash, returns a bool, or undefined if error
 * @param {string} password Plaintext password
 * @param {string} hash Salted hash
 * @returns {Promise<true|false|undefined>} Bool of whether password matches hash
 */
export const isValidPassword = async (password, hash) =>
  bcrypt.compare(password, hash).catch((err) => console.error(err.message));

export const isAuthorized = (id, session) => {
  if (!id || !session || !session.passport.id) return false;
  return +id === +session.passport.id;
};
