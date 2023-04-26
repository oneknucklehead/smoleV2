import bcrypt from 'bcryptjs'
const products = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    user: {
      name: 'Zoheb Ahmed',
      email: 'zohebcool1542@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Electronics',
    price: 89.99,
    sizes: ['S', 'M', 'L', 'XL'],
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    user: {
      name: 'Zoheb Ahmed',
      email: 'zohebcool1542@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: 'Electronics',
    price: 599.99,
    sizes: ['S', 'M', 'L', 'XL'],

    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    user: {
      name: 'Zoheb Ahmed',
      email: 'zohebcool1542@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Electronics',
    price: 929.99,
    sizes: ['S', 'M', 'L', 'XL'],

    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    user: {
      name: 'Zoheb Ahmed',
      email: 'zohebcool1542@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Electronics',
    price: 399.99,
    sizes: ['S', 'M', 'L', 'XL'],

    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    user: {
      name: 'Zoheb Ahmed',
      email: 'zohebcool1542@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Electronics',
    price: 49.99,
    sizes: ['S', 'M', 'L', 'XL'],

    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    user: {
      name: 'Zoheb Ahmed',
      email: 'zohebcool1542@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    },
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Electronics',
    price: 29.99,
    sizes: ['S', 'M', 'L', 'XL'],
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
]

const shops = [
  {
    name: "zoheb's",
    tagline: 'The World’s Most Comfortable Shoes',
    description: 'best high quality products on sale',
    clientId:
      'AVF4009YAvZXHqtrBPo5634GyzwrX_RD5oDeOholz1SjIymNmRSowCRAPDcL0MhOu2LrOMBECMAkoS9Y',
    // user: {
    //   name: 'Zoheb Ahmed',
    //   email: 'zohebcool1542@gmail.com',
    //   password: '123456',
    //   isAdmin: true,
    // },

    products: [
      {
        name: `Nike Air Force 1 '07`,
        image: '/images/airforce.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'The radiance lives on in the Nike Air Force 1 07, the b-ball OG that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.',
        brand: 'Nike',
        category: 'Shoes',
        price: 89.99,
        sizes: ['6', '7', '8', '9'],
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
      },
      {
        name: 'LeBron 19',
        image: '/images/lebron.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'LeBron thrives when stakes are high and the pressure on.The LeBron 19 harnesses that energy with a locked-in fit and an updated cushioning system.The snug inner sleeve is pulled together by a sculpted overlay that the laces feed through to help prevent the foot from moving inside the shoe.Embedded pods in the tongue and around the collar help reduce weight, keep the ankle aligned and give players the secure feel and confidence to go all out when the game is on the line.',
        brand: 'Nike',
        category: 'BasketBall shoes',
        price: 599.99,
        sizes: ['7', '8', '9', '10'],

        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
      },
      {
        name: 'Nike Air Max 270 G',
        image: '/images/airmax.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Look legendary in the Nike Air Max 270 G. The silhouette is a stitch-for-stitch reconstruction of the original big Air icon, with the addition of breathable mesh and innovative traction that performs at the highest level of play.',
        brand: 'Nike',
        category: 'Golf Shoe',
        price: 929.99,
        sizes: ['6', '7', '8', '9'],

        countInStock: 5,
        rating: 3,
        numReviews: 12,
      },
      {
        name: 'Nike SB Chron 2 Canvas',
        image: '/images/NikeChron.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'The Nike SB Chron 2 Canvas is the newest member of the Chron family.The revamped design includes a reshaped collar and heel for an improved fit—all while maintaining the comfort and performance you expect from Nike SB.',
        brand: 'Nike',
        category: 'Skate Shoes',
        price: 399.99,
        sizes: ['8', '9', '10'],

        countInStock: 11,
        rating: 5,
        numReviews: 12,
      },
      {
        name: 'Nike Phantom GT2 Elite FG',
        image: '/images/phantom.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Create a shockwave on the pitch with an updated design that looks as fast as you play. The Flyknit upper has a textured pattern thats engineered to help you place your shots with pinpoint accuracy.',
        brand: 'Nike',
        category: 'Firm-Ground Football Boot',
        price: 49.99,
        sizes: ['6', '6.5', '7', '8'],

        countInStock: 7,
        rating: 3.5,
        numReviews: 10,
      },
      {
        name: 'Nike Air VaporMax 2021 FK',
        image: '/images/nikeair.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'The Nike Air VaporMax 2021 FK is airy and easy to wear with super-stretchy, recycled Flyknit fabric (plus a soft collar that sculpts your ankle).The stitched-on Swoosh and recycled TPU heel clip add a splash of intrigue as you float down the streets on incredibly soft VaporMax cushioning.',
        brand: 'Nike',
        category: 'Shoes',
        price: 29.99,
        sizes: ['6', '7', '8'],
        countInStock: 0,
        rating: 4,
        numReviews: 12,
      },
    ],
  },
  // {
  //   name: "Zoya's",
  //   tagline: 'Monthly Beauty and Grooming Subscription Boxes',
  //   description: 'More than a beauty box',
  //   clientId:
  //     'AVF4009YAvZXHqtrBPo5634GyzwrX_RD5oDeOholz1SjIymNmRSowCRAPDcL0MhOu2LrOMBECMAkoS9Y',

  //   // user: {
  //   //   name: 'Zoheb Ahmed',
  //   //   email: 'zohebcool1542@gmail.com',
  //   //   password: '123456',
  //   //   isAdmin: true,
  //   // },

  //   products: [
  //     {
  //       name: 'Kay Beauty Eyeshadow Palette - Pure Bloom',
  //       image: '/images/makeup1.jpg',
  //       user: {
  //         name: 'Zoheb Ahmed',
  //         email: 'zohebcool1542@gmail.com',
  //         password: bcrypt.hashSync('123456', 10),
  //         isAdmin: true,
  //       },
  //       description:
  //         'Ready to take your love for eyeshadows to the next level? Kay Beauty has launched four game-changing eyeshadow palettes that will become a staple in your kit. The 9-in-1 palettes offer a gorgeous mix of matte and shimmer shades that are thoughtfully curated to create limitless eye looks. The shades are richly pigmented, so one stroke is all it takes for the colour to work its magic on the eyelids. Take your pick from dreamy nudes and fresh florals to earthy hues and lush berry tones, which are suited for all Indian skin tones. High matte or high-shine, a little goes a super long way with these pretty palettes.',
  //       brand: 'Kay Beauty',
  //       category: 'beauty product',
  //       price: 89.99,
  //       // sizes: ['S', 'M', 'L', 'XL'],
  //       countInStock: 10,
  //       rating: 4.5,
  //       numReviews: 12,
  //     },
  //     {
  //       name: 'SkinShield Anti-Pollution Matte Foundation - Rose Beige 04',
  //       image: '/images/makeup2.jpg',
  //       user: {
  //         name: 'Zoheb Ahmed',
  //         email: 'zohebcool1542@gmail.com',
  //         password: bcrypt.hashSync('123456', 10),
  //         isAdmin: true,
  //       },
  //       description:
  //         'The shade True Toffee 12 is the closest match to shade mentioned. When it comes to finding your foundation match, keep in mind your skin tone and undertone. Your skin tone refers to the natural color of your complexion, and this can range from fair to deep.',
  //       brand: 'Nykaa',
  //       category: 'beauty product',
  //       price: 599.99,
  //       // sizes: ['S', 'M', 'L', 'XL'],

  //       countInStock: 7,
  //       rating: 4.0,
  //       numReviews: 8,
  //     },
  //     {
  //       name: 'Faces Canada Ultime Pro HD Runway Ready Foundation - Beige 03 (30ml)',
  //       image: '/images/makeup3.jpg',
  //       user: {
  //         name: 'Zoheb Ahmed',
  //         email: 'zohebcool1542@gmail.com',
  //         password: bcrypt.hashSync('123456', 10),
  //         isAdmin: true,
  //       },
  //       description:
  //         'Faces Canada Ultime Pro HD foundation gives your skin a medium to full buildable coverage. By building up the foundation in layers, you can achieve a full coverage look. ',
  //       brand: 'Faces Canada',
  //       category: 'beauty product',
  //       price: 929.99,
  //       // sizes: ['S', 'M', 'L', 'XL'],

  //       countInStock: 5,
  //       rating: 3,
  //       numReviews: 12,
  //     },
  //     {
  //       name: 'M.A.C RubyS Crew/ Retro Matte Liquid Lipcolour - Ruby Phew!',
  //       image: '/images/makeup4.jpg',
  //       user: {
  //         name: 'Zoheb Ahmed',
  //         email: 'zohebcool1542@gmail.com',
  //         password: bcrypt.hashSync('123456', 10),
  //         isAdmin: true,
  //       },
  //       description:
  //         'Stylish. Dynamic. Resilient. An iconic, vivid blue-red hue, now in a pigment-soaked liquid lipcolour with a velvety, mattest-matte finish, too! For those who prefer timeless glamour to all-out flash, matte always reigns supreme. So, get ready for your lips to live the dream! Ruby Woo puts her timeless twist on her classic texture with long-wearing and robustly saturated Retro Matte Liquid Lipcolour in Ruby Phew! She’s perfect for everyday and any occasion – brunch, the office and/or errands, just to name a few.',
  //       brand: 'MAC',
  //       category: 'beauty Product',
  //       price: 399.99,
  //       // sizes: ['S', 'M', 'L', 'XL'],

  //       countInStock: 11,
  //       rating: 5,
  //       numReviews: 12,
  //     },
  //     {
  //       name: 'M.A.C Studio Fix Powder Plus Foundation - C3 (15gm)',
  //       image: '/images/makeup6.jpg',
  //       user: {
  //         name: 'Zoheb Ahmed',
  //         email: 'zohebcool1542@gmail.com',
  //         password: bcrypt.hashSync('123456', 10),
  //         isAdmin: true,
  //       },
  //       description:
  //         'MAC foundation shades are the same across different ranges. If you wear shade NC30 in the liquid foundation collection, then NC30 in the powder foundation range will work for you.',
  //       brand: 'MAC',
  //       category: 'beauty product',
  //       price: 49.99,
  //       sizes: ['S', 'M', 'L', 'XL'],

  //       countInStock: 7,
  //       rating: 3.5,
  //       numReviews: 10,
  //     },
  //     {
  //       name: 'Tangle Teezer The Wet Detangler Hairbrush - Mauve / Dusky Pink',
  //       image: '/images/makeup5.jpg',
  //       user: {
  //         name: 'Zoheb Ahmed',
  //         email: 'zohebcool1542@gmail.com',
  //         password: bcrypt.hashSync('123456', 10),
  //         isAdmin: true,
  //       },
  //       description:
  //         'Perfect for use on wet hair, it gently but confidently detangles vulnerable hair, helping to cause less breakage.',
  //       brand: 'Random',
  //       category: 'beauty product',
  //       price: 29.99,
  //       // sizes: ['S', 'M', 'L', 'XL'],
  //       countInStock: 0,
  //       rating: 4,
  //       numReviews: 12,
  //     },
  //   ],
  // },
  {
    name: "Zaid's",
    tagline: 'The best a man can get',
    description: 'Best gym products at a reasonable rate',
    // user: {
    //   name: 'Zoheb Ahmed',
    //   email: 'zohebcool1542@gmail.com',
    //   password: '123456',
    //   isAdmin: true,
    // },

    products: [
      {
        name: 'Lycan 8Kg Home Gym Kit with Rods, Dumbbells and Accessories',
        image: '/images/gym1.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Lycan home gym - ◀ This set with accessories are best for all regular gym lovers. ◀ This set of adjustable pvc dumbbells is an excellent choice for a home gym.◀ This take seconds to assemble and take out.',
        brand: 'Lycan',
        category: 'Gym equipments',
        price: 89.99,
        sizes: ['S', 'M', 'L', 'XL'],
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
      },
      {
        name: 'Boldfit Wrist Band for Men & Women, Wrist Supporter for Gym.',
        image: '/images/gym2.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Best Quality Gym Straps : Made From High Quality Cotton Which Will Feel Very Comfortable While Workout. Cloth Is Soft So It Will Not Leave Any Marks And Not Harsh For Skin.',
        brand: 'Bold Fit',
        category: 'Gym equipments',
        price: 599.99,
        sizes: ['S', 'M', 'L', 'XL'],

        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
      },
      {
        name: 'WELLBERG Push Up Bars WORKOUT Equipment Fitness - GYM',
        image: '/images/gym3.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Strength Training Pushup Stands are made of high quality polypropylene, which is sturdy and strong enough to support any weight',
        brand: 'WELLBERG',
        category: 'gym equipments',
        price: 929.99,
        sizes: ['S', 'M', 'L', 'XL'],

        countInStock: 5,
        rating: 3,
        numReviews: 12,
      },
      {
        name: 'Hykes Knee Cap Compression Support for Gym Running Cycling Sports Jogging Workout Pain Relief',
        image: '/images/gym4.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Effective Joint Pain Relief And Faster Recovery: This knee brace support designed with the perfect blend of breathable material providing excellent support for all rugged activities, and allowing full range of motion.',
        brand: 'Hykes',
        category: 'gym equipments',
        price: 29.99,
        sizes: ['S', 'M', 'L', 'XL'],
        countInStock: 0,
        rating: 4,
        numReviews: 12,
      },
    ],
  },
  {
    name: "Ashish's",
    tagline:
      'Menswear Founded on Fit, Built on Service, and Focused on Style. However You Fit, Bonobos Fits You.',
    description: 'best menswear at the lowest price',
    // user: {
    //   name: 'Zoheb Ahmed',
    //   email: 'zohebcool1542@gmail.com',
    //   password: '123456',
    //   isAdmin: true,
    // },

    products: [
      {
        name: 'Muscle Fit Turtleneck Sweater',
        image: '/images/wear1.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Rib-knit turtleneck sweater in cotton with long raglan sleeves. Muscle Fit - designed to showcase the body’s physique. Narrow shoulders and tapered sleeves for a flattering silhouette.',
        brand: 'H&M',
        category: 'Menswear',
        price: 89.99,
        sizes: ['S', 'M', 'L', 'XL'],
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
      },
      {
        name: 'Long Hooded Cardigan',
        image: '/images/wear2.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Long cardigan in lightweight sweatshirt fabric with visible seams and a jersey-lined, drawstring hood. Long sleeves, side pockets, and asymmetric, raw-edge hem. No fasteners.',
        brand: 'H&M',
        category: 'Menswear',
        price: 599.99,
        sizes: ['S', 'M', 'L', 'XL'],

        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
      },
      {
        name: 'Relaxed Fit Sweater',
        image: '/images/wear3.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Soft, fine-knit sweater with wool content. Dropped shoulders, long sleeves, and ribbing at neck, cuffs, and hem.',
        brand: 'H&M',
        category: 'Menswear',
        price: 929.99,
        sizes: ['S', 'M', 'L', 'XL'],

        countInStock: 5,
        rating: 3,
        numReviews: 12,
      },
      {
        name: 'Muscle Fit Turtleneck Sweater',
        image: '/images/wear4.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Rib-knit turtleneck sweater in cotton with long raglan sleeves. Muscle Fit - designed to showcase the body’s physique. Narrow shoulders and tapered sleeves for a flattering silhouette.',
        brand: 'H&M',
        category: 'Menswear',
        price: 399.99,
        sizes: ['S', 'M', 'L', 'XL'],

        countInStock: 11,
        rating: 5,
        numReviews: 12,
      },
      {
        name: 'Muscle Fit Half-zip Sweater',
        image: '/images/wear5.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Polo-style sweater in a soft, fine-knit viscose and cotton blend. Collar, half-zip, and long raglan sleeves. Fine ribbing at cuffs and hem. Muscle Fit – designed to showcase the body’s physique. Narrow shoulders, tapered sleeves, and sharply tapered waist for a flattering silhouette.',
        brand: 'H&M',
        category: 'Menswear',
        price: 49.99,
        sizes: ['S', 'M', 'L', 'XL'],

        countInStock: 7,
        rating: 3.5,
        numReviews: 10,
      },
      {
        name: 'Cashmere Sweater',
        image: '/images/wear6.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Fine-knit sweater in soft cashmere with a round neck, long sleeves, and ribbing at neckline, cuffs, and hem.',
        brand: 'H&M',
        category: 'Menswear',
        price: 29.99,
        sizes: ['S', 'M', 'L', 'XL'],
        countInStock: 0,
        rating: 4,
        numReviews: 12,
      },
    ],
  },
  {
    name: "Yashu's",
    tagline: 'Awesome Products. No Nonsense.',
    description: 'Best wallets at the lowest price',
    clientId:
      'AVF4009YAvZXHqtrBPo5634GyzwrX_RD5oDeOholz1SjIymNmRSowCRAPDcL0MhOu2LrOMBECMAkoS9Y',

    // user: {
    //   name: 'Zoheb Ahmed',
    //   email: 'zohebcool1542@gmail.com',
    //   password: '123456',
    //   isAdmin: true,
    // },

    products: [
      {
        name: 'Men Brown Solid RFID Protected Leather Two Fold Wallet',
        image: '/images/wallet1.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Brown solid two fold wallet 2 main compartments, has a non detachable flap 5 card holders, 2 slip pockets, has a flap coin pocket',
        brand: 'WildHorn',
        category: 'Wallets',
        price: 89.99,
        sizes: ['S', 'M', 'L', 'XL'],
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
      },
      {
        name: 'Men Navy Blue Striped Two Fold Wallet',
        image: '/images/wallet2.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Brown solid two fold wallet 2 main compartments, has a non detachable flap 5 card holders, 2 slip pockets, has a flap coin pocket',
        brand: 'Tommy Hilfiger',
        category: 'wallets',
        price: 599.99,
        sizes: ['S', 'M', 'L', 'XL'],

        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
      },
      {
        name: 'Men Navy Blue & Brown Leather Colourblocked Two Fold Wallet',
        image: '/images/wallet3.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description:
          'Navy Blue and brown leather colourblocked two fold wallet 1 main compartment 4 card holders, 2 slip pockets, has a flap coin pocket',
        brand: 'Tommy Hilfiger',
        category: 'Wallets',
        price: 929.99,
        sizes: ['S', 'M', 'L', 'XL'],

        countInStock: 5,
        rating: 3,
        numReviews: 12,
      },
      {
        name: 'Men Blue Leather Solid Two Fold Wallet',
        image: '/images/wallet4.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description: 'Blue solid two fold wallet',
        brand: 'Levis',
        category: 'Wallets',
        price: 399.99,
        sizes: ['S', 'M', 'L', 'XL'],

        countInStock: 11,
        rating: 5,
        numReviews: 12,
      },
      {
        name: 'Men Navy Blue Leather Two Fold Wallet',
        image: '/images/wallet5.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description: 'Navy blue solid two fold wallet',
        brand: 'Peter England',
        category: 'Wallets',
        price: 49.99,
        sizes: ['S', 'M', 'L', 'XL'],

        countInStock: 7,
        rating: 3.5,
        numReviews: 10,
      },
      {
        name: 'Men Coffee Brown Leather Textured Two Fold Wallet',
        image: '/images/wallet6.jpg',
        user: {
          name: 'Zoheb Ahmed',
          email: 'zohebcool1542@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          isAdmin: true,
        },
        description: 'Coffee brown textured leather two fold wallet',
        brand: 'Levis',
        category: 'Wallets',
        price: 29.99,
        sizes: ['S', 'M', 'L', 'XL'],
        countInStock: 0,
        rating: 4,
        numReviews: 12,
      },
    ],
  },
  {
    name: 'Belly',
    tagline: '100% dark',
    description: 'best Dark chocolate at the lowest price',
    // user: {
    //   name: 'Zoheb Ahmed',
    //   email: 'zohebcool1542@gmail.com',
    //   password: '123456',
    //   isAdmin: true,
    // },
    products: [...products],
  },
]
export default shops
