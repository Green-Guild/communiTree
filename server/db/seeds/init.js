import User from '../models/User.js';
import Garden from '../models/Garden.js';
import Gathering from '../models/Gathering.js';
import Post from '../models/Post.js';
import Reply from '../models/Reply.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await knex('users').del();

  await User.createLocalUser({
    username: 'test',
    password: 'test',
    display_name: 'test',
    age: 30,
    location: '11230',
    picture: 'https://i.ibb.co/zZj8b3t/ra1.png',
  });
  await User.createGoogleUser({
    google_id: '1234',
    display_name: 'google',
    picture:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  });

  // Users
  await User.createLocalUser({
    username: 'rafi_barides',
    display_name: 'Rafi Barides',
    age: 12,
    location: '11230',
    picture: 'https://i.ibb.co/zZj8b3t/ra1.png',
    password: 'Hello1234',
  });

  await User.createLocalUser({
    username: 'reuben_ogbonna',
    display_name: 'Reuben Ogbonna',
    age: 27,
    location: '10001',
    picture:
      'https://images.squarespace-cdn.com/content/v1/61f2c931c536520a4daa56ec/1643492157717-N0AL5RLVEFW18H1FJGGQ/Reuben+Ogbonna.png',
    password: 'Marcy2024',
  });

  await User.createLocalUser({
    username: 'gonzalo_romero',
    display_name: 'Gonzalo Romero',
    age: 30,
    location: '11217',
    picture:
      'https://media.licdn.com/dms/image/D4E03AQGdNvT3gbIlpg/profile-displayphoto-shrink_200_200/0/1670452125309?e=2147483647&v=beta&t=ZL4KbqIHeGM3isBfeBOIsmOqClOan5ZHker_N9r9kWk',
    password: 'snapSnaps!',
  });

  await User.createLocalUser({
    username: 'angelica_ibarlucea',
    display_name: 'Angelica Ibarlucea',
    age: 24,
    location: '11101',
    picture:
      'https://media.licdn.com/dms/image/D4D03AQGt4w941TYGHg/profile-displayphoto-shrink_800_800/0/1708731163185?e=1720656000&v=beta&t=33oVsvt7EnRo9B_2_J-aWKhf6uzEN4iKe9FrxlF1RTU',
    password: 'newRock12',
  });

  await User.createLocalUser({
    username: 'motun_b',
    display_name: 'Motun B',
    age: 29,
    location: '11205',
    picture:
      'https://images.ctfassets.net/5tpkas7gb5io/178TAzhuPPZvs3gv9lhvzg/d8ed331791d3991eff911747071da2dd/Motun_Marcy_Headshot_website.jpg?w=1920&q=75',
    password: 'PlantPower2024',
  });

  await User.createLocalUser({
    username: 'ben_spector',
    display_name: 'Ben Spector',
    age: 26,
    location: '10002',
    picture:
      'https://images.ctfassets.net/5tpkas7gb5io/5o7VSAHtvgTZCfbHH9J2pi/9e264d065746c554e2e5e61ca5e4f725/Ben_Marcy_Headshot_website.jpg?w=640&q=75',
    password: 'GreenThumbs',
  });

  await User.createLocalUser({
    username: 'jorge_hadad_rey',
    display_name: 'Jorge Hadad Rey',
    age: 31,
    location: '10467',
    picture:
      'https://media.licdn.com/dms/image/D4E03AQFz64tcWff7aA/profile-displayphoto-shrink_800_800/0/1693365857389?e=2147483647&v=beta&t=9WehLn681rvzHGlqAEDlma30vUcmxk3vB2BI8xJoM1A',
    password: 'Jobs4Gardens',
  });

  // Gardens
  await Garden.create({
    name: 'Marcy Plot',
    location: '10001',
    image:
      'https://www.thespruce.com/thmb/IHY_gzo-3Y5terRR2mdPQf0gnSY=/4711x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-start-a-garden-from-scratch-2132778-hero-5f6138784a034bad8bf9607ccb18dbed.jpg',
    description: 'The Marcy Plot',
    is_public: true,
    owner_id: 1,
  });

  await Garden.create({
    name: 'Green Corner Club',
    location: '11217',
    image:
      'https://www.thespruce.com/thmb/IHY_gzo-3Y5terRR2mdPQf0gnSY=/4711x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-start-a-garden-from-scratch-2132778-hero-5f6138784a034bad8bf9607ccb18dbed.jpg',
    description: 'Green Corner Club',
    is_public: true,
    owner_id: 2,
  });

  await Garden.create({
    name: 'Plant Haven',
    location: '11101',
    image:
      'https://ogden_images.s3.amazonaws.com/www.sungazette.com/images/2024/05/05162549/05022024-Day-of-Prayer-3-1100x601.jpg',
    description: 'Plant Haven',
    is_public: true,
    owner_id: 3,
  });

  await Garden.create({
    name: 'Motun Sanctuary',
    location: '11205',
    image:
      'https://images.ctfassets.net/5tpkas7gb5io/178TAzhuPPZvs3gv9lhvzg/d8ed331791d3991eff911747071da2dd/Motun_Marcy_Headshot_website.jpg?w=1920&q=75',
    description: "Motun's Respectful Equal Opportunity Garden Sanctuary",
    is_public: true,
    owner_id: 4,
  });

  await Garden.create({
    name: 'Gardenfest',
    location: '10002',
    image:
      'https://images.ctfassets.net/5tpkas7gb5io/5o7VSAHtvgTZCfbHH9J2pi/9e264d065746c554e2e5e61ca5e4f725/Ben_Marcy_Headshot_website.jpg?w=640&q=75',
    description: 'Gardenfest',
    is_public: true,
    owner_id: 5,
  });

  await Garden.create({
    name: 'Planter Union',
    location: '10467',
    image:
      'https://media.licdn.com/dms/image/D4E03AQFz64tcWff7aA/profile-displayphoto-shrink_800_800/0/1693365857389?e=2147483647&v=beta&t=9WehLn681rvzHGlqAEDlma30vUcmxk3vB2BI8xJoM1A',
    description: 'Planter Union',
    is_public: true,
    owner_id: 6,
  });

  // Gatherings
  await Gathering.create({
    location: '10001',
    description:
      'A fun-filled day to celebrate the power of plants with music, a potluck, and networking. Reuben Ogbonna is your host, offering a chance to connect with fellow gardeners.',
    host_id: 1,
    garden_id: 1,
    date: '2024-05-10 15:00:00',
    image:
      'https://ogden_images.s3.amazonaws.com/www.sungazette.com/images/2024/05/05162549/05022024-Day-of-Prayer-3-1100x601.jpg',
    title: 'Reuben Plant Power Parade',
  });

  await Gathering.create({
    location: '11217',
    description:
      'An evening full of sustainable gardening tips and laughter. Gonzalo Romero hosts with a delightful mix of humor and gardening know-how.',
    host_id: 2,
    garden_id: 2,
    date: '2024-05-10 15:00:00',
    image: 'https://i.ibb.co/zZj8b3t/ra1.png',
    title: "Gonzo's Sustainable Sass Splash",
  });

  await Gathering.create({
    location: '11101',
    description:
      'A gathering focused on growing onions and other root vegetables on the East Coast. Angelica Ibarlucea shares her expertise with hands-on demos.',
    host_id: 3,
    garden_id: 3,
    date: '2024-05-10 15:00:00',
    image: 'https://i.ibb.co/Kq5xbgS/Angelica-Apples.png',
    title: "Angelica's Onions",
  });

  await Gathering.create({
    location: '11205',
    description:
      "Motun's Plant Meetup brings the latest plant care techniques and trends to the community. Connect with other growers and expand your network.",
    host_id: 4,
    garden_id: 4,
    date: '2024-05-10 15:00:00',
    image:
      'https://cdn.britannica.com/42/91642-050-332E5C66/Keukenhof-Gardens-Lisse-Netherlands.jpg',
    title: 'Eco-Summit',
  });

  await Gathering.create({
    location: '10002',
    description:
      "A party that features garden-related projects and activities. Ben Spector's event encourages creativity and networking.",
    host_id: 5,
    garden_id: 5,
    date: '2024-05-10 15:00:00',
    image:
      'https://www.bhg.com/thmb/SdH3liapyw5vZZf-LKe_MmgvYuA=/4000x0/filters:no_upscale():strip_icc()/BHG-What-Is-a-Permaculture-Garden-3AWGe3jUq5hAt8vbh3yisf-f3d0c14454b44bf5b319234918574b9e.jpg',
    title: 'Botanical Bash',
  });

  await Gathering.create({
    location: '10467',
    description:
      'An employment fair for aspiring gardeners seeking career opportunities. Jorge Hadad Rey connects job seekers with exciting new prospects.',
    host_id: 6,
    garden_id: 6,
    date: '2024-05-10 15:00:00',
    image:
      'https://www.marthastewart.com/thmb/NbLHicUgeCrSqCtbyKS8c2vmHzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/garden-trends-hero-d67def0ea07f4129b4011f3d04d7c3f2.jpg',
    title: 'Garden Job Junction',
  });

  // Posts
  await Post.create({
    title: 'Help Needed in my Garden!',
    body: "The tomatoes keep wilting. Any ideas on how to save them? I'm looking for practical tips on sunlight and watering.",
    user_id: 1,
    garden_id: 1,
    gathering_id: 1,
  });

  await Post.create({
    title: 'Need Advice',
    body: "How do I bring the perfect dramatic flair to my begonias? I'd love suggestions for colorful companion plants.",
    user_id: 2,
    garden_id: 2,
    gathering_id: 2,
  });

  await Post.create({
    title: 'Onion Tips?',
    body: 'What are some best practices for growing onions on the East Coast? Any advice on soil and spacing would be appreciated.',
    user_id: 3,
    garden_id: 3,
    gathering_id: 3,
  });

  await Post.create({
    title: 'I need help with my garden!',
    body: "Please help with wilting tomatoes ASAP. I haven't found the right balance with fertilizer or sunlight.",
    user_id: 4,
    garden_id: null,
    gathering_id: 4,
  });

  // Replies
  await Reply.create({
    post_id: 1,
    body: 'Sunlight is critical. Try moving them to a brighter spot or adjusting the watering schedule.',
    user_id: 2,
  });

  await Reply.create({
    post_id: 2,
    body: 'Consider mixing in some more colorful flowers around the edges! Dramatic lilies work well.',
    user_id: 3,
  });

  await Reply.create({
    post_id: 3,
    body: 'It depends on the location and soil. How is your watering schedule? Try adjusting it if necessary.',
    user_id: 4,
  });
};
