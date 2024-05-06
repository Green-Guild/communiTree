import User from '../models/User.js';
import GoogleUser from '../models/GoogleUser.js';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await knex('users').del();

  await User.create('cool_cat', '1234');
  await User.create('l33t-guy', '1234');
  await User.create('wowow', '1234');
  await User.create('test', 'test');

  await knex('google_users').del();

  await GoogleUser.create({
    googleId: '1234',
    displayName: 'Cool Cat',
    picture:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  });
};
