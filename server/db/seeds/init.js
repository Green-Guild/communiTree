import User from "../models/User.js";
import Garden from "../models/Garden.js";
import Event from "../models/Event.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await knex("comments").del();
  await knex("posts").del();
  await knex("events").del();
  await knex("gardens").del();
  await knex("users").del();

  await User.createLocalUser({
    username: "test",
    password: "test",
    display_name: "test",
    zipcode: "11230",
    image: "https://i.ibb.co/zZj8b3t/ra1.png",
  });
  await User.createGoogleUser({
    google_id: "1234",
    display_name: "google",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });

  // Users
  const user1 = await User.createLocalUser({
    username: "rafi_barides",
    display_name: "Rafi Barides",
    zipcode: "11230",
    image:
      "https://media.licdn.com/dms/image/D4E03AQHfEW73G0B-iw/profile-displayphoto-shrink_800_800/0/1704645247140?e=2147483647&v=beta&t=HpjKCi3Gba_4aVrlk8TYm9T-pzF3eU94vi4k-MssY7c",
    password: "Rafi@MLS!",
  });

  const user2 = await User.createLocalUser({
    username: "angelica_ibarlucea",
    display_name: "Angelica Ibarlucea",
    zipcode: "11101",
    image:
      "https://media.licdn.com/dms/image/D4D03AQGt4w941TYGHg/profile-displayphoto-shrink_800_800/0/1708731163185?e=1720656000&v=beta&t=33oVsvt7EnRo9B_2_J-aWKhf6uzEN4iKe9FrxlF1RTU",
    password: "newRock12",
  });

  const user3 = await User.createLocalUser({
    username: "motun_b",
    display_name: "Motun Bolumole",
    zipcode: "11205",
    image:
      "https://images.ctfassets.net/5tpkas7gb5io/178TAzhuPPZvs3gv9lhvzg/d8ed331791d3991eff911747071da2dd/Motun_Marcy_Headshot_website.jpg?w=1920&q=75",
    password: "PlantPower2024",
  });

  const user4 = await User.createLocalUser({
    username: "jw_planting",
    display_name: "Justin Watson",
    zipcode: "11205",
    image:
      "https://media.licdn.com/dms/image/D4E03AQG1dJbMu1F_1Q/profile-displayphoto-shrink_800_800/0/1707440405928?e=1721865600&v=beta&t=wV0fhAjzMX2JyQc0ZfinxzAgPmsFntZpjGX1M99wmiM",
    password: "1234",
  });

  const user5 = await User.createLocalUser({
    username: "zo_mans",
    display_name: "Zo Manzour",
    zipcode: "11230",
    image:
      "https://media.licdn.com/dms/image/D4E03AQEo4z5joZu2KQ/profile-displayphoto-shrink_800_800/0/1709920678047?e=1721865600&v=beta&t=e32PXyjqPa2KmC5YVeN6aPLdMN8uK8wwMTUoZ_PrDrE",
    password: "1234",
  });

  const user6 = await User.createLocalUser({
    username: "nicole_jf",
    display_name: "Nicole Juarez-Flores",
    zipcode: "10282",
    image: "https://i.ibb.co/khY4LXT/IMG-5308.jpg",
    password: "1234",
  });

  const user7 = await User.createLocalUser({
    username: "alexa_planting",
    display_name: "Alexa R Leoto",
    zipcode: "10282",
    image:
      "https://media.licdn.com/dms/image/D4E03AQHvpzCo02847Q/profile-displayphoto-shrink_800_800/0/1704473378228?e=1721865600&v=beta&t=_UHbTSbHn2UAM6n4-OEqh96fMQ3D30IhoUzL0lzDQus",
    password: "1234",
  });

  const user8 = await User.createLocalUser({
    username: "itzel_rendon",
    display_name: "Itzel Rendon",
    zipcode: "11230",
    image: "https://ca.slack-edge.com/TKZN62HDF-U018FQ27207-7d459fb97c60-512",
    password: "1234",
  });

  const user9 = await User.createLocalUser({
    username: "holiday_hollins",
    display_name: "Hollins Gause",
    zipcode: "10282",
    image:
      "https://media.licdn.com/dms/image/C4D03AQGtbO1q4l6eaQ/profile-displayphoto-shrink_800_800/0/1563985511177?e=1721865600&v=beta&t=z36PZHlLtxv_wL-iXkf08J8Gn4vsXwiHj4Ytr4Dtymg",
    password: "1234",
  });

  const user10 = await User.createLocalUser({
    username: "reuben_planting",
    display_name: "Reuben Ogbonna",
    zipcode: "10282",
    image:
      "https://media.licdn.com/dms/image/D4E03AQGzRQVSu0RBBw/profile-displayphoto-shrink_800_800/0/1690555189665?e=1721865600&v=beta&t=QUZvaS8CInPd-g0zeFwXoqNvOdqrxDqLXeLgTkenJ-c",
    password: "1234",
  });

  const user11 = await User.createLocalUser({
    username: "ben_spector",
    display_name: "Ben Spector",
    zipcode: "10002",
    image:
      "https://images.ctfassets.net/5tpkas7gb5io/5o7VSAHtvgTZCfbHH9J2pi/9e264d065746c554e2e5e61ca5e4f725/Ben_Marcy_Headshot_website.jpg?w=640&q=75",
    password: "GreenThumbs",
  });

  const user12 = await User.createLocalUser({
    username: "daniel_figgs",
    display_name: "Daniel Figueora",
    zipcode: "11776",
    image:
      "https://i.ibb.co/Z2WWLL0/TKZN62-HDF-U05-NT9492-FK-7887c5bdd592-512.png",
    password: "1234",
  });

  const user13 = await User.createLocalUser({
    username: "shira_neshama_l",
    display_name: "Shira Neshama",
    zipcode: "11691",
    image: "https://i.ibb.co/n00JZvz/IMG-1651-1.jpg",
    password: "1234",
  });

  const user14 = await User.createLocalUser({
    username: "freskim_rama",
    display_name: "Freskim Rama",
    zipcode: "10002",
    image: "https://i.ibb.co/9sPDhgK/Screenshot-2024-02-20-at-4-31-05-PM.png",
    password: "1234",
  });

  const user15 = await User.createLocalUser({
    username: "roe_your_boat",
    display_name: "Roe Cox",
    zipcode: "10002",
    image: "https://ca.slack-edge.com/TKZN62HDF-U05NEKUHWD8-3f57e5828428-512",
    password: "1234",
  });

  const user16 = await User.createLocalUser({
    username: "nico_arugala",
    display_name: "Nico Aruca",
    zipcode: "10002",
    image:
      "https://media.licdn.com/dms/image/D4E03AQErvbgpse19DQ/profile-displayphoto-shrink_800_800/0/1713194622157?e=1721865600&v=beta&t=caM73dR1GW0J1KBne7ibfMVGmxCEeZVv6VAWgH_Rosk",
    password: "1234",
  });

  const user17 = await User.createLocalUser({
    username: "crist_martinez",
    display_name: "Cris Martinez",
    zipcode: "10002",
    image:
      "https://media.licdn.com/dms/image/D4E03AQEW2wflOwoO-w/profile-displayphoto-shrink_800_800/0/1709145623085?e=1721865600&v=beta&t=DEogTTAP9lOu-phv33ayea1mOQ2BMIbg7KpiPI7RoQI",
    password: "1234",
  });

  const user18 = await User.createLocalUser({
    username: "izzy_g",
    display_name: "Izzy Gilden",
    zipcode: "11213",
    image:
      "https://media.licdn.com/dms/image/C4D03AQFRF4Fgm9XcAw/profile-displayphoto-shrink_800_800/0/1648582637375?e=1721865600&v=beta&t=hLykzj88fj6g5yRkeyzBtZuVwOkdWL2jm5EOdG3Rj94",
    password: "1234",
  });

  const user19 = await User.createLocalUser({
    username: "jason_mai",
    display_name: "Jason Mai",
    zipcode: "11230",
    image:
      "https://media.licdn.com/dms/image/D4E03AQE2CN_YHIP_tw/profile-displayphoto-shrink_800_800/0/1692284874883?e=1721865600&v=beta&t=l3W48X2DiKDwlZ9EcLh2TRY3B0lW-ra8AipP_uxyE4Y",
    password: "1234",
  });

  const user20 = await User.createLocalUser({
    username: "luisa_garcia",
    display_name: "Luisa Garcia",
    zipcode: "07652",
    image:
      "https://techgirlsglobal.org/wp-content/uploads/2023/01/79F8E534-17E4-47A6-88A0-8B9D19811879-%E5%BC%B5%E6%81%A9%E6%85%88-Grace-Chang.jpg",
    password: "Luisa2024!",
  });

  const user21 = await User.createLocalUser({
    username: "amira_najem",
    display_name: "Amira Najem",
    zipcode: "07093",
    image:
      "https://static.vecteezy.com/system/resources/previews/003/152/073/non_2x/cute-attractive-teenage-girl-smiling-on-a-white-background-free-photo.JPG",
    password: "Amira@123",
  });

  const user22 = await User.createLocalUser({
    username: "sana_rojas",
    display_name: "Sana Rojas",
    zipcode: "11550",
    image: "https://www.globalgiving.org/pfil/26396/pict_large.jpg",
    password: "SantiR2024",
  });

  const user23 = await User.createLocalUser({
    username: "elisa_khoury",
    display_name: "Elisa Khoury",
    zipcode: "11375",
    image:
      "https://i.guim.co.uk/img/media/a4380f1eb23ed62a7fa287aaaac2216beed08b12/0_0_3024_4032/master/3024.jpg?width=445&dpr=1&s=none",
    password: "EliasKSecure!",
  });

  const user24 = await User.createLocalUser({
    username: "carmen_martinez",
    display_name: "Carmen Martinez",
    zipcode: "08901",
    image:
      "https://i.pinimg.com/550x/89/28/8c/89288c74443752ae8b683553056c5c44.jpg",
    password: "Carmen2024!",
  });

  const user25 = await User.createLocalUser({
    username: "diego_rivera",
    display_name: "Diego Rivera",
    zipcode: "11226",
    image:
      "https://media.istockphoto.com/id/1212776097/photo/portrait-of-contented-male-hispanic-teenager.jpg?s=612x612&w=0&k=20&c=qmbkIrIIvmsB2mZB6zmDyoIfZCv_JsWs058bLHcMRwU=",
    password: "Diego@123",
  });

  const user26 = await User.createLocalUser({
    username: "K_alomar",
    display_name: "Kevin Alomar",
    zipcode: "07601",
    image:
      "https://edgarhaircut.com/wp-content/uploads/2023/04/Edgar-Cut-Curly-Hair-1-1-jpg.webp",
    password: "SaraA2024",
  });

  const user27 = await User.createLocalUser({
    username: "mario_vasquez",
    display_name: "Mario Vasquez",
    zipcode: "10002",
    image:
      "https://i.pinimg.com/550x/67/04/13/67041336ce3dbfc4e07c0a1fde9663dd.jpg",
    password: "MarioV@123",
  });

  const user28 = await User.createLocalUser({
    username: "alejandro_perez",
    display_name: "Alejandro Perez",
    zipcode: "10314",
    image:
      "https://www.ustaflorida.com/wp-content/uploads/2020/10/Featured_Edgar-Pabone_Hispanic-Heritage-Month-2020.jpg",
    password: "Alejandro2024!",
  });

  const user29 = await User.createLocalUser({
    username: "rana_haddad",
    display_name: "Rana Haddad",
    zipcode: "07030",
    image: "https://i.redd.it/bzb3j5oergw91.jpg",
    password: "RanaH123!",
  });

  // Gardens
  const garden1 = await Garden.create({
    name: "Battery Urban Farm",
    zipcode: "10004",
    address: "Battery Park, New York, NY",
    image:
      "https://www.thebattery.org/wp-content/uploads/2023/01/IMG_0086-scaled-e1675206271184.jpeg",
    description: "Battery Urban Farm is a thriving green space in the heart of Battery Park. This garden focuses on education, sustainability, and community engagement. Visitors can enjoy workshops, volunteer opportunities, and fresh produce.",
    is_public: true,
    owner_id: user1.id,
  });
  
  const garden2 = await Garden.create({
    name: "Red Hook Community",
    zipcode: "11231",
    address: "580 Columbia St, Brooklyn, NY",
    image:
      "https://res.cloudinary.com/rhi/image/upload/c_fill,g_auto,h_614,w_922/v1/wp/2019/11/IMG_3458-scaled.jpg",
    description: "Red Hook Community Farm is a vibrant green space in Brooklyn. This urban farm emphasizes food justice, youth empowerment, and local agriculture. The farm offers educational programs and volunteer opportunities.",
    is_public: true,
    owner_id: user2.id,
  });
  
  const garden3 = await Garden.create({
    name: "East New York Farms",
    zipcode: "11207",
    address: "613 New Lots Ave, Brooklyn, NY",
    image:
      "https://www.thespruce.com/thmb/IHY_gzo-3Y5terRR2mdPQf0gnSY=/4711x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-start-a-garden-from-scratch-2132778-hero-5f6138784a034bad8bf9607ccb18dbed.jpg",
    description: "East New York Farms is dedicated to community-led urban agriculture. This garden provides fresh produce, supports local farmers, and fosters environmental stewardship. It offers markets, workshops, and youth programs.",
    is_public: true,
    owner_id: user3.id,
  });
  
  const garden4 = await Garden.create({
    name: "La Plaza Cultural",
    zipcode: "10009",
    address: "E 9th St & Ave C, New York, NY",
    image:
      "https://media.timeout.com/images/105631745/image.jpg",
    description: "La Plaza Cultural is a unique community garden and cultural center in the East Village. It features beautiful green spaces, performance areas, and art installations. The garden hosts events, workshops, and community gatherings.",
    is_public: true,
    owner_id: user4.id,
  });
  
  const garden5 = await Garden.create({
    name: "Q Gardens Community Farm",
    zipcode: "11218",
    address: "70 E 18th St, Brooklyn, NY",
    image:
      "https://www.marthastewart.com/thmb/NbLHicUgeCrSqCtbyKS8c2vmHzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/garden-trends-hero-d67def0ea07f4129b4011f3d04d7c3f2.jpg",
    description: "Q Gardens Community Farm is a volunteer-run garden in Brooklyn. It focuses on sustainable farming practices and community involvement. The farm offers fresh produce, educational workshops, and volunteer opportunities.",
    is_public: true,
    owner_id: user5.id,
  });
  
  const garden6 = await Garden.create({
    name: "Hattie Carthan Community Garden",
    zipcode: "11206",
    address: "654 Lafayette Ave, Brooklyn, NY",
    image:
      "https://cdn.sanity.io/images/32lej2m6/production/6e7fedb71dd3dd4a9f45b14b20c8afc2dae610f7-2500x1875.jpg?auto=format",
    description: "Hattie Carthan Community Garden is a historic green space in Bedford-Stuyvesant. This garden promotes environmental education, urban agriculture, and food security. It offers programs for all ages and fresh produce.",
    is_public: true,
    owner_id: user6.id,
  });
  
  const garden7 = await Garden.create({
    name: "Liberty Community Garden",
    zipcode: "07030",
    address: "100 Hudson St, Hoboken, NJ",
    image:
      "https://www.verywellfamily.com/thmb/m4Gz5vPrFZ7s7pL-MTV1p6lS9Do=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hispanic-father-and-daughter-gardening-together-463247401-58a390123df78c475830f5f5.jpg",
    description: "Liberty Community Garden in Hoboken provides a green oasis for local residents. It focuses on sustainable gardening practices and community engagement. The garden hosts events, workshops, and offers plots for individual use.",
    is_public: true,
    owner_id: user7.id,
  });
  
  const garden8 = await Garden.create({
    name: "Riverside Valley Community Garden",
    zipcode: "10027",
    address: "Riverside Dr & W 138th St, New York, NY",
    image:
      "https://www.usda.gov/sites/default/files/nrcs-welcome-peoples-garden-blog-080322.jpg",
    description: "Riverside Valley Community Garden is a peaceful green space in Harlem. It offers educational programs, volunteer opportunities, and community events. The garden emphasizes environmental sustainability and local engagement.",
    is_public: true,
    owner_id: user8.id,
  });
  
  const garden9 = await Garden.create({
    name: "6th & B Garden",
    zipcode: "10009",
    address: "6th St & Ave B, New York, NY",
    image:
      "https://static01.nyt.com/images/2023/08/13/realestate/09garden01/oakImage-1691507985138-videoSixteenByNineJumbo1600.jpg",
    description: "6th & B Garden is a thriving community garden in the East Village. It features diverse plantings, art installations, and performance spaces. The garden hosts cultural events, workshops, and is open to the public.",
    is_public: true,
    owner_id: user9.id,
  });
  
  const garden10 = await Garden.create({
    name: "Green Oasis Community Garden",
    zipcode: "10009",
    address: "8th St & Ave C, New York, NY",
    image:
      "https://www.southernliving.com/thmb/4LVlzOp4IO3M1BhLo-bDhVcX-nY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rmasey_vegetable_garden_overall_2491901_ramse_0391-2000-de885ad0dacc412e9cb8cd57d6ee7910.jpg",
    description: "Green Oasis Community Garden is a beautiful green space in the East Village. It features lush plantings, ponds, and community plots. The garden offers educational programs, cultural events, and a peaceful retreat.",
    is_public: true,
    owner_id: user10.id,
  });
  

  // Events
  const event1 = await Event.create({
    zipcode: "10001",
    address: "322 Birch Drive, Yonkers, NY 10701",
    description:
      "A fun-filled day to celebrate the power of plants with music, a potluck, and networking. Reuben Ogbonna is your host, offering a chance to connect with fellow gardeners.",
    host_id: user1.id,
    garden_id: garden1.id,
    event_date: "2024-07-10 15:00:00",
    image:
      "https://ogden_images.s3.amazonaws.com/www.sungazette.com/images/2024/05/05162549/05022024-Day-of-Prayer-3-1100x601.jpg",
    title: "Plant Power Parade",
  });

  const event2 = await Event.create({
    zipcode: "11217",
    address: "2 Cedar Boulevard, Edison, NJ 08817",
    description:
      "An evening full of sustainable gardening tips and laughter. Gonzalo Romero hosts with a delightful mix of humor and gardening know-how.",
    host_id: user2.id,
    garden_id: garden2.id,
    event_date: "2024-08-10 15:00:00",
    image: "https://i.ibb.co/sqBmkzj/garden-path-royalty-free-image-1701459574.png",
    title: "Sustainable Splash",
  });

  const event3 = await Event.create({
    zipcode: "11101",
    address: "101 Pine Road, Stamford, CT 06902",
    description:
      "A event focused on growing onions and other root vegetables on the East Coast. Angelica Ibarlucea shares her expertise with hands-on demos.",
    host_id: user3.id,
    garden_id: garden3.id,
    event_date: "2024-07-10 15:00:00",
    image: "https://i.ibb.co/Kq5xbgS/Angelica-Apples.png",
    title: "Onion Workshop",
  });

  const event4 = await Event.create({
    zipcode: "11205",
    address: "791 Oak Lane, White Plains, NY 10601",
    description:
      "Motun's Plant Meetup brings the latest plant care techniques and trends to the community. Connect with other growers and expand your network.",
    host_id: user4.id,
    garden_id: garden4.id,
    event_date: "2024-08-10 15:00:00",
    image:
      "https://cdn.britannica.com/42/91642-050-332E5C66/Keukenhof-Gardens-Lisse-Netherlands.jpg",
    title: "The New Eco-Summit",
  });

  const event5 = await Event.create({
    zipcode: "10002",
    address: "1456 Maple Street, Hackensack, NJ 07601",
    description:
      "A party that features garden-related projects and activities. Ben Spector's event encourages creativity and networking.",
    host_id: user5.id,
    garden_id: garden5.id,
    event_date: "2025-05-10 15:00:00",
    image:
      "https://www.bhg.com/thmb/SdH3liapyw5vZZf-LKe_MmgvYuA=/4000x0/filters:no_upscale():strip_icc()/BHG-What-Is-a-Permaculture-Garden-3AWGe3jUq5hAt8vbh3yisf-f3d0c14454b44bf5b319234918574b9e.jpg",
    title: "Botanical Bash",
  });

  const event6 = await Event.create({
    zipcode: "10467",
    address: "23 Elmwood Avenue, Fairfield, CT 06824",
    description:
      "An employment fair for aspiring gardeners seeking career opportunities. Jorge Hadad Rey connects job seekers with exciting new prospects.",
    host_id: user6.id,
    garden_id: garden6.id,
    event_date: "2025-05-10 15:00:00",
    image:
      "https://www.marthastewart.com/thmb/NbLHicUgeCrSqCtbyKS8c2vmHzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/garden-trends-hero-d67def0ea07f4129b4011f3d04d7c3f2.jpg",
    title: "Garden Job Junction",
  });

  // Posts
  const post1 = await Post.create({
    title: "Herb garden pests",
    body: "My herb garden is being overrun by pests. What can I do? #gardening #herbs #pestcontrol",
    user_id: user22.id
});

  
  const comment1_1 = await Comment.create({
    post_id: post1.id,
    body: "You should start planting tomatoes in late spring. They need plenty of sunlight and warm soil.",
    user_id: user2.id,
  });
  
  const post2 = await Post.create({
    title: "Indoor herb garden tips?",
    body: "I live in an apartment with limited outdoor space. Any tips for starting an indoor herb garden? #herbgarden #indoorplants #gardening",
    user_id: user2.id
  });
  
  const comment2_1 = await Comment.create({
    post_id: post2.id,
    body: "Use small pots with good drainage and place them near a sunny window. Basil and mint are great options for beginners.",
    user_id: user3.id,
  });
  
  const post3 = await Post.create({
    title: "First time with cucumbers",
    body: "Planting cucumbers this weekend, any advice? #cucumbers",
    user_id: user3.id
  });
  
  const comment3_1 = await Comment.create({
    post_id: post3.id,
    body: "Happy Birthday Motun!",
    user_id: user16.id,
  });
  
  const post4 = await Post.create({
    title: "Best soil for succulents?",
    body: "I'm trying to grow succulents but they're not thriving. What soil mix do you recommend? #succulents #soil",
    user_id: user4.id
  });
  
  const comment4_1 = await Comment.create({
    post_id: post4.id,
    body: "Use a well-draining cactus or succulent mix. Avoid regular potting soil as it retains too much moisture.",
    user_id: user5.id,
  });
  
  const post5 = await Post.create({
    title: "Garden tools recommendations?",
    body: "What are some essential garden tools for a beginner? #gardentools #beginner #gardening",
    user_id: user5.id
  });
  
  const comment5_1 = await Comment.create({
    post_id: post5.id,
    body: "A good pair of gloves, a trowel, and a watering can are must-haves. A small spade and pruning shears are also very useful.",
    user_id: user6.id,
  });
  
  const comment5_2 = await Comment.create({
    post_id: post5.id,
    body: "Don't forget a kneeling pad! It makes gardening much more comfortable.",
    user_id: user7.id,
  });
  
  const post6 = await Post.create({
    title: "Experience with composting?",
    body: "I'm interested in starting composting. What should I know before I begin? #sustainability",
    user_id: user6.id
  });
  
  const comment6_1 = await Comment.create({
    post_id: post6.id,
    body: "Start with a mix of green and brown materials. Keep it moist and turn it regularly to aerate.",
    user_id: user8.id,
  });
  
  const comment6_2 = await Comment.create({
    post_id: post6.id,
    body: "Avoid adding meat or dairy to your compost pile. Stick to fruit and vegetable scraps, coffee grounds, and eggshells.",
    user_id: user9.id,
  });
  
  const post7 = await Post.create({
    title: "Raised bed gardening?",
    body: "I'm considering building raised beds for my garden. What are the benefits? #raisedbed",
    user_id: user7.id
  });
  
  const comment7_1 = await Comment.create({
    post_id: post7.id,
    body: "Raised beds offer better drainage and can help reduce weeds. They also make it easier to manage soil quality.",
    user_id: user10.id,
  });
  
  const post8 = await Post.create({
    title: "Companion planting?",
    body: "What are some good companion plants for tomatoes? #companionplanting #tomatoes",
    user_id: user8.id
  });
  
  const comment8_1 = await Comment.create({
    post_id: post8.id,
    body: "Basil and marigolds are great companions for tomatoes. They can help repel pests and improve growth.",
    user_id: user11.id,
  });
  
  const comment8_2 = await Comment.create({
    post_id: post8.id,
    body: "Avoid planting tomatoes near potatoes or corn. They can attract similar pests and diseases.",
    user_id: user12.id,
  });
  
  const post9 = await Post.create({
    title: "Dealing with pests?",
    body: "What's the best way to deal with aphids in my garden? pests #aphids #gardening",
    user_id: user9.id
  });
  
  const comment9_1 = await Comment.create({
    post_id: post9.id,
    body: "Try using a mixture of water and dish soap to spray on the aphids. Ladybugs are also natural predators of aphids.",
    user_id: user13.id,
  });
  
  const post10 = await Post.create({
    title: "Watering schedule?",
    body: "How often should I water my vegetable garden? #watering #vegetables",
    user_id: user10.id
  });
  
  const comment10_1 = await Comment.create({
    post_id: post10.id,
    body: "It depends on the weather and soil type, but generally, once a week deeply is better than shallow watering daily.",
    user_id: user14.id,
  });
  
  const post11 = await Post.create({
    title: "Starting seeds indoors?",
    body: "I'm planning to start seeds indoors for the first time. Any tips? #indoorgardening",
    user_id: user11.id
  });
  
  const comment11_1 = await Comment.create({
    post_id: post11.id,
    body: "Use a seed starting mix and keep the soil consistently moist. A grow light can help if you don't have enough natural light.",
    user_id: user15.id,
  });
  
  const comment11_2 = await Comment.create({
    post_id: post11.id,
    body: "Label your seeds and keep them in a warm place until they germinate. Once they sprout, move them to a cooler area with lots of light.",
    user_id: user16.id,
  });
  
  const post12 = await Post.create({
    title: "Garden layout ideas?",
    body: "I'm redesigning my garden layout. Any ideas for a small urban space? #gardenlayout #urbangardening #gardening",
    user_id: user12.id
  });
  
  const comment12_1 = await Comment.create({
    post_id: post12.id,
    body: "Consider vertical gardening to maximize space. Hanging planters and trellises can help you grow more in a limited area.",
    user_id: user1.id,
  });

  const post13 = await Post.create({
    title: "Hydrangea care in colder climates?",
    body: "Can hydrangeas thrive in the tri-state area, or should I consider another plant for my garden? #gardening #hydrangeas",
    user_id: user13.id
});

const post14 = await Post.create({
    title: "Organic pest control methods?",
    body: "Looking for eco-friendly ways to manage pests in my vegetable garden. Any suggestions? #gardening #pestcontrol #organic",
    user_id: user14.id
});

const comment14_1 = await Comment.create({
    post_id: post14.id,
    body: "Neem oil is great for handling pests naturally and it's safe for plants!",
    user_id: user3.id,
});

const post15 = await Post.create({
    title: "Best soil for indoor herbs?",
    body: "What type of soil should I use for growing herbs indoors in pots? #gardening #herbs #indoorgardening",
    user_id: user15.id
});

const comment15_1 = await Comment.create({
    post_id: post15.id,
    body: "A light, well-draining potting mix works best for herbs. Make sure it's not too dense!",
    user_id: user4.id,
});

const post16 = await Post.create({
    title: "Starting a butterfly garden",
    body: "Any tips on starting a butterfly garden? What plants should I include? #gardening #butterflies",
    user_id: user16.id
});

const comment16_1 = await Comment.create({
    post_id: post16.id,
    body: "Plant native flowering plants like milkweed and lavender to attract butterflies.",
    user_id: user5.id,
});

const post17 = await Post.create({
    title: "Dealing with shady gardens",
    body: "Half of my garden is in deep shade. What plants can I grow there? #gardening #shadeplants",
    user_id: user17.id
});

const post18 = await Post.create({
    title: "Composting basics?",
    body: "I'm new to composting. Can someone explain the basics? #gardening #composting",
    user_id: user18.id
});

const comment18_1 = await Comment.create({
    post_id: post18.id,
    body: "Start with kitchen scraps, leaves, and grass clippings. Avoid meat and dairy products!",
    user_id: user6.id,
});

const post19 = await Post.create({
    title: "Watering frequency for succulents?",
    body: "How often should I water my succulents during the winter? #gardening #succulents",
    user_id: user19.id
});

const comment19_1 = await Comment.create({
    post_id: post19.id,
    body: "Succulents need less water in the winter. Once a month should be sufficient.",
    user_id: user7.id,
});

const post20 = await Post.create({
    title: "Best vegetables for a rooftop garden?",
    body: "What are the best vegetables to grow in a rooftop garden in NYC? #gardening #rooftopgarden",
    user_id: user20.id
});

const comment20_1 = await Comment.create({
    post_id: post20.id,
    body: "Tomatoes, peppers, and leafy greens do well on rooftops due to their sun exposure.",
    user_id: user8.id,
});

const post21 = await Post.create({
    title: "Growing fruit trees in containers?",
    body: "Is it possible to grow fruit trees in containers? What should I consider? #gardening #fruittrees #containers",
    user_id: user21.id
});

const comment21_1 = await Comment.create({
    post_id: post21.id,
    body: "Choose dwarf varieties and ensure you have big enough pots to accommodate the roots.",
    user_id: user9.id,
});

const post22 = await Post.create({
  title: "Best time to plant tomatoes?",
  body: "I'm new to gardening and want to plant tomatoes. What's the best time of year to start? #gardening #tomatoes #planting",
  user_id: user12.id
});
  
};
