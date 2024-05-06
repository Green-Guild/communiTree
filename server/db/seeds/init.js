import User from '../models/User.js';
import GoogleUser from '../models/GoogleUser.js';
import passport from 'passport';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await knex('users').del();

  await User.createLocalUser({ username: 'test', password: 'test' });
  await User.createGoogleUser({
    google_id: '1234',
    display_name: 'google',
    picture:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  });
};
