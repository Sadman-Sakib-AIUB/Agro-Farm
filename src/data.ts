import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'cow-ghee',
    name: 'Premium Golden Cow Ghee (Farm Churned)',
    name_bn: 'প্রিমিয়াম গোল্ডেন খাঁটি গাওয়া ঘি (খামারজাত)',
    category: 'ghee-oils',
    categoryLabel: 'Pure Ghee & Oils',
    categoryLabel_bn: 'খাঁটি ঘি এবং তেল',
    price: 1200,
    options: [
      { label: '500g Glass Jar', label_bn: '৫০০ গ্রাম কাঁচের জার', price: 1200 },
      { label: '1kg Premium Jar', label_bn: '১ কেজি প্রিমিয়াম জার', price: 2200 },
    ],
    shortDescription: 'Hand-churned from pure cow milk cream on our Manikganj farm.',
    shortDescription_bn: 'মানিকগঞ্জের খামারে দেশী গরুর দুধের খাঁটি মাখন থেকে ঐতিহ্যবাহী পদ্ধতিতে প্রস্তুতকৃত।',
    description: 'Our Premium Golden Cow Ghee is prepared using the age-old Bilona-style method. We collect cream directly from our grass-fed cows, boil it slowly over light timber fire, and hand-churn it in clay pots to preserve its golden granulated texture and dense, nutty aroma. This pure ghee has zero preservatives, colorings, or added vegetable oils.',
    description_bn: 'আমাদের প্রিমিয়াম গাওয়া ঘি সম্পূর্ণ ঐতিহ্যবাহী বিলোনা পদ্ধতিতে প্রস্তুত করা হয়। ঘাস খাওয়া দেশি গরুর দুধ থেকে সরাসরি মাখন সংগ্রহ করে অত্যন্ত ধীর আঁচে মাটির পাত্রে জ্বাল দিয়ে এটি প্রস্তুত করা হয়। এর ফলে ঘিয়ের সুবর্ণ দানাদার টেক্সচার ও মন মাতানো প্রাকৃতিক সুবাস অক্ষুণ্ণ থাকে। এতে কোনো রাসায়নিক, রঙ বা ক্ষতিকারক তেল মেশানো হয় না।',
    imageUrl: 'https://images.unsplash.com/photo-1631515223380-7f21a93e71c6?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1631515223380-7f21a93e71c6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800'
    ],
    stockBadge: 'Only 18 Premium Jars Left',
    stockBadge_bn: 'মাত্র ১৮ টি জার বাকি আছে',
    vloggerNote: 'I remember watching my grandmother churn fresh cream in her village kitchen. When I moved from Dhaka to Manikganj, my primary mission was to restore this forgotten culinary art. Every single jar of this ghee has been slow-boiled in our farmyard under my personal monitoring. It is pure liquid gold.',
    vloggerNote_bn: 'গ্রামের বাড়িতে ছোটবেলায় দাদীকে কাঠের ঘানি আর মাটির পাত্রে মাখন তুলতে দেখতাম। ঢাকা থেকে মানিকগঞ্জ এসে আমি প্রথম এই খাঁটি ঐতিহ্যটি পুনরুজ্জীবিত করার কাজে হাত দিই। খামারে আমার সরাসরি তত্ত্বাবধানে কাঠের আঁচে এই ঘি জ্বাল দেওয়া হয়। এটি রান্নায় অনন্য স্বাদ যুক্ত করবে, ইনশাআল্লাহ।',
    featuredInVlog: {
      title: 'Our Grandma’s Secret Churning Recipe Rediscovered!',
      title_bn: 'হারিয়ে যাওয়া দাদীর হাতের ঘি তৈরির রেসিপি পুনরুদ্ধার!',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800',
      description: 'Watch us collect fresh milk cream from local feed yards, boil it over clay stoves, and filter the golden ghee live on camera.',
      description_bn: 'ভিডিওতে দেখুন কিভাবে আমরা প্রান্তিক খামারিদের থেকে খাঁটি দুধের মাখন সংগ্রহ করি, ধীর আঁচে জ্বাল দিয়ে সুবর্ণ ঘি তৈরি করি।'
    }
  },
  {
    id: 'mustard-honey',
    name: 'Backyard Mustard-Flower Raw Honey',
    name_bn: 'খাঁটি সরিষা ফুলের মধু (খামার থেকে সরাসরি)',
    category: 'honey-sweets',
    categoryLabel: 'Raw Honey & Sweets',
    categoryLabel_bn: 'প্রাকৃতিক মধু ও মিষ্টি',
    price: 800,
    options: [
      { label: '500g Squeeze Glass Bottle', label_bn: '৫০০ গ্রাম স্কুইজ কাঁচের বোতল', price: 800 },
      { label: '1kg Family Pack', label_bn: '১ কেজি ফ্যামিলি প্যাক', price: 1500 },
    ],
    shortDescription: 'Collected straight from our backyard honey boxes during winter.',
    shortDescription_bn: 'শীতকালে আমাদের খামারের পাশে ফুটে থাকা খাঁটি সরিষা ফুলের ক্ষেতে স্থাপিত মৌবাক্স থেকে সংগৃহীত।',
    description: 'When winter blankets Manikganj in fields of bright yellow mustard blossoms, our honeybees go to work. This honey is 100% raw, completely unfiltered, and packed with enzymatic goodness. It has an unmistakable floral note with a mildly sweet finish that naturally crystallizes into a luscious, butter-like whipped cream texture as the weather cools.',
    description_bn: 'শীতকালে যখন মানিকগঞ্জের মাঠগুলো হলদে সরিষা ফুলে ছেয়ে যায়, তখন আমাদের মৌমাছিরা মধু সংগ্রহে মেতে ওঠে। এই মধু শতভাগ খাঁটি ও ফিল্টারবিহীন, যা মধুর আসল গুণাগুণ ধরে রাখে। হালকা সু মিষ্টি ফ্লেভারের এই মধু শীতকালে স্বাভাবিক নিয়মেই জমে ডালডা বা চর্বির মতো দানাদার রূপ ধারণ করে, যা খাঁটি মধুর অন্যতম লক্ষণ।',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=800'
    ],
    stockBadge: 'Only 25 KG Left This Batch',
    stockBadge_bn: 'এই ব্যাচের মাত্র ২৫ কেজি বাকি আছে',
    vloggerNote: 'We placed our bee hives right behind our farmhouse where the mustard field begins. Looking out of my living room balcony and hearing the peaceful buzz of bees working on yellow flowers is surreal. We extracted this batch last Friday on my daily vlog.',
    vloggerNote_bn: 'আমরা খামারের একেবারে পেছনে যেখানে সরিষার মাঠ শুরু হয়েছে সেখানে মৌমাছির বক্সগুলো বসিয়েছি। শীতের সকালে হলদে ফুলের চাদরে মৌমাছিদের গুঞ্জন চমৎকার লাগে। গত শুক্রবার সরাসরি ব্লগের ক্যামেরার সামনে এই খাটি মধু সংগ্রহ করা হয়েছে। ভিডিওতে আপনি পুরা প্রসেস দেখতে পাবেন!',
    featuredInVlog: {
      title: 'Harvesting 50KG Fresh Mustard Honey Behind Our Duplex!',
      title_bn: 'আমাদের খামারের পেছনের ক্ষেত থেকে ৫০ কেজি খাঁটি সরিষা মধু সংগ্রহ!',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=800',
      description: 'In today\'s video, join us as we open our backyard hives, centrifugally extract this amber honey, and bottle it direct with zero heating.',
      description_bn: 'আজকের ভিডিওতে আমাদের সাথে সরাসরি খামারের মৌবাক্স খোলার আনন্দ উপভোগ করুন। কোনো তাপ প্রয়োগ ছাড়াই সরাসরি মধু বোতলজাতের দৃশ্য।'
    }
  },
  {
    id: 'mustard-oil',
    name: 'Cold-Pressed Kachi Ghani Mustard Oil',
    name_bn: 'কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল',
    category: 'ghee-oils',
    categoryLabel: 'Pure Ghee & Oils',
    categoryLabel_bn: 'খাঁটি ঘি এবং তেল',
    price: 350,
    options: [
      { label: '1 Liter Eco-Bottle', label_bn: '১ লিটার ইকো-বোতল', price: 350 },
      { label: '2 Liters Family Jug', label_bn: '২ লিটার ফ্যামিলি জগ', price: 650 },
    ],
    shortDescription: 'Pressed from locally harvested Manikganj mustard seeds.',
    shortDescription_bn: 'মানিকগঞ্জের স্থানীয় কৃষকদের উর্বর জমিতে উৎপাদিত সেরা জাতের লাল ও হলুদ সরিষা বীজ থেকে প্রস্তুত।',
    description: 'Our Kachi Ghani Mustard Oil has that high-pungency kick that authentic Bangladeshi cooking demands. Extracted at extremely low temperatures without any chemical solvents, our cold-pressing method ensures that all the natural antioxidants, pungent allyl isothiocyanate, and monounsaturated fats remain fully preserved.',
    description_bn: 'আমাদের সরিষার তেলে পাবেন কাঠের ঘানির ঐতিহ্যবাহী চোখ ধাঁধানো ঝাঝ এবং সুবাস যা খাঁটি সরিষার তেলের বৈশিষ্ট্য। কোনো প্রকার রাসায়নিক বা কৃত্রিম গন্ধ ছাড়াই সম্পূর্ণ কাঠের ঘানিতে মৃদু চাপে নিষ্কাশন করা হয়। এতে তেলের সকল প্রাকৃতিক অ্যান্টি-অক্সিডেন্ট ও পুষ্টিগুণ অক্ষুণ্ণ থাকে।',
    imageUrl: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=800'
    ],
    stockBadge: 'Freshly Pressed Yesterday',
    stockBadge_bn: 'গতকাল সদ্য ঘানি থেকে ভাঙানো তেল',
    vloggerNote: 'Your macher jhol and bhortas will taste entirely different once you try oil made from seeds cultivated right here in the fertile plains of Manikganj. We dried these seeds in our sunlit yard for 3 days before feeding them to our wooden expeller.',
    vloggerNote_bn: 'আমাদের মানিকগঞ্জের উর্বর মাটির লাল সরিষার ঝাঁঝ অন্যরকম। বাড়ির উঠোনে বীজ রোদে শুকিয়ে আমরা ঐতিহ্যবাহী কাঠে মোড়ানো ঘানিতে এই তেল প্রস্তুত করি। আপনার রান্নাঘরের ভর্তা আর দেশী মাছের ঝোলে আসল স্বাদ ফিরিয়ে আনবে এই সরিষার তেল।',
    featuredInVlog: {
      title: 'Running Our Own Mustard Oil Expeller for the First Time!',
      title_bn: 'আমাদের নিজেদের কাঠের ঘানি মিশনে প্রথম সরিষা ভাঙানোর অভিজ্ঞতা!',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=800',
      description: 'Watch us run our wooden press machine using mustard seeds harvested from our neighbor\'s farm. Purity at its absolute peak.',
      description_bn: 'প্রতিবেশীর ক্ষেত থেকে সংগৃহীত সরিষা বীজ দিয়ে কাঠের ঘানি ঘুরিয়ে খাঁটি তেল সরসারি সংগ্রহের সোনালী সময়।'
    }
  },
  {
    id: 'patali-gur',
    name: 'Organic Manikganj Patali Gur',
    name_bn: 'মানিকগঞ্জের ঐতিহ্যবাহী খাঁটি পাটালি গুড়',
    category: 'honey-sweets',
    categoryLabel: 'Raw Honey & Sweets',
    categoryLabel_bn: 'প্রাকৃতিক মধু ও মিষ্টি',
    price: 400,
    options: [
      { label: '500g Patali Solid Block', label_bn: '৫০০ গ্রাম পাটালি ব্লক', price: 400 },
      { label: '1kg Solid Blocks Box', label_bn: '১ কেজি সলিড বক্স প্যাক', price: 750 },
    ],
    shortDescription: 'Smoky, melt-in-your-mouth date-palm jaggery.',
    shortDescription_bn: 'জিভে জল আনা স্মোকি ফ্লেভারের শতভাগ নির্ভেজাল খেজুর রস থেকে তৈরি পাটালি গুড়।',
    description: 'Manikganj is legendary for its premium date balm sap (Khejur Rosh). Our gur is prepared before dawn by veteran local sap collectors (Gachis). The sap is simmered in large iron pans over earthen stoves burning dry palm leaves, transforming into thick, creamy golden-brown syrup which then solidifies into patent melt-in-your-mouth Patali blocks. Zero artificial sugar or molasses is added.',
    description_bn: 'খেজুর রসের সুস্বাদু পাটালি গুড়ের জন্য মানিকগঞ্জের সুখ্যাতি বাংলাদেশ জুড়ে। আমাদের গুড় ভোর হওয়ার আগে অত্যন্ত দক্ষ স্থানীয় গাছিদের সংগৃহীত তাজা খেজুর রস থেকে তৈরি হয়। রস বড় লোহার কড়াইতে মাটির চুলায় শুকনো খেজুর পাতা পুড়িয়ে ফুটিয়ে ঘন করা হয়, যা ক্ষীর হয়ে অসাধারণ পাটালিতে পরিণত হয়। এতে চিনি বা হাইড্রোস দেওয়া হয় না।',
    imageUrl: 'https://images.unsplash.com/photo-1608219990919-a8706346f5c8?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1608219990919-a8706346f5c8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581447101795-7abd694ef113?auto=format&fit=crop&q=80&w=800'
    ],
    stockBadge: 'Limited Stock - Fresh Batch',
    stockBadge_bn: 'সীমিত স্টক - সম্পূর্ণ ফ্রেশ নতুন গুড়',
    vloggerNote: 'Waking up at 5:00 AM with the misty Manikganj cold to watch our Gachis climb trees and collect the clay pots is a magical experience. Eating fresh patali with hot pitha is one of the biggest reasons I love my new life here. This gur is extremely soft and smells intensely smoky.',
    vloggerNote_bn: 'কুয়াশা ঢাকা ভোরে খেজুর রস নামানোর দৃশ্য দেখে যে শিহরণ হয়, মানিকগঞ্জে আসার আগে তা শুধু স্বপ্নেই দেখতাম। ঐতিহ্যবাহী চুলায় রস জ্বাল দিয়ে তৈরি গুড় দিয়ে ধোঁয়া ওঠা গরম পিঠা খাওয়ার স্বাদই আলাদা। আমাদের এই গুড় খুব নরম এবং এর প্রাকৃতিকভাবে স্মোকি মিষ্টি গন্ধ জিভে লেগেই থাকে।',
    featuredInVlog: {
      title: 'At 5:00 AM: Collecting Fresh Date Palm Sap with Manikganj Gachis!',
      title_bn: 'ভোর ৫ টায়: কুয়াশায় ঢাকা মানিকগঞ্জের গাছিদের সাথে খেজুর রস সংগ্রহের দৃশ্য!',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581447101795-7abd694ef113?auto=format&fit=crop&q=80&w=800',
      description: 'Adventure with us into the fog to bring down sweet Rosh! Watch our traditional open-stove boiling process to make authentic Patali Gur.',
      description_bn: 'ভোরে গাছ থেকে রস পেড়ে নামানোর অ্যাডভেঞ্চার ও ঘ্রাণযুক্ত পাটালি গুড় তৈরির ঐতিহ্যবাহী রোমাঞ্চকর কর্মকাণ্ড।'
    }
  },
  {
    id: 'spices-combo',
    name: 'Sun-Dried Farm Spices Combo',
    name_bn: 'রোদে শুকানো খাঁটি হোমগ্রাউন্ড মশলা কম্বো',
    category: 'spices',
    categoryLabel: 'Farm-Ground Spices',
    categoryLabel_bn: 'খাঁটি মশলাপাতি',
    price: 450,
    options: [
      { label: 'Turmeric, Chili & Coriander Combo (3x200g)', label_bn: 'হলুদ, মরিচ ও ধনিয়া খাঁটি কম্বো (৩টি ২০০ গ্রাম করে)', price: 450 },
    ],
    shortDescription: 'Sun-dried on our courtyard and stone-ground to retain raw fragrance.',
    shortDescription_bn: 'বাড়ির উঠোনে রোদে শুকিয়ে ঐতিহ্যবাহী চাতাল মিলে ভাঙানো নিখাদ হলদ, মরিচ ও ধনিয়া গুঁড়োর সেট।',
    description: 'Tired of adulterated spice powder? Our farm-ground trio consists of premium turmeric (Holud), fiery red chili (Morich), and fragrant coriander (Dhonia). We purchase the raw rhizomes and pods directly from local Manikganj contract farmers, wash them in deep water wells, sun-dry them extensively in our duplex farmyard, and cold-grind them in local slow mills.',
    description_bn: 'বাজারের ভেজাল মশলা নিয়ে চিন্তিত? আমাদের এই নিখাদ মশলা কম্বোতে আছে দেশী জাতের সেরা হলুদ গুড়ো, খাঁটি ঝাল লাল মরিচ ও সুগন্ধি ধনিয়া। স্থানীয় প্রান্তিক চাষীদের থেকে সরাসরি সংগৃহীত সেরা ফসলগুলো আমরা বাড়ির কলপাড়ে ভালো করে ধুয়ে রোদে শুকাই, এরপর ধীরগতির ঐতিহ্যবাহী মিলে ভাঙানো হয় যেন তেল ও সুবাস উবে না যায়।',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1532135771963-d8617e1ba7edd?auto=format&fit=crop&q=80&w=800'
    ],
    stockBadge: 'Only 32 Packs Available',
    stockBadge_bn: 'মাত্র ৩২ টি কম্বো প্যাক অবশিষ্ট আছে',
    vloggerNote: 'When you open these pouches, the dense fragrant yellow and deep-red powder will immediately confirm their absolute purity. My wife and I laid out these bright red peppers in rows on our roof to capture the perfect Manikganj noon-sun warmth.',
    vloggerNote_bn: 'প্যাকেট খুললেই এর উজ্জ্বল প্রাকৃতিক রঙ আর তীব্র সুবাস আপনাকে শতভাগ খাঁটি হওয়ার প্রমাণ দেবে। মানিকগঞ্জের কড়া রোদে মরিচ আর হলুদ ছাদজুড়ে বিছিয়ে শুকানোর দৃশ্য আমরা ব্লগে কয়েকদিন আগে দেখিয়েছিলাম। আপনার রান্না করা রান্নায় এনে দেবে মনকাড়া ঐতিহ্যবাহী তৃপ্তি।',
    featuredInVlog: {
      title: 'Sun-Drying 200KG Organic Red Chillies on Our Roof!',
      title_bn: 'আমাদের বাড়ীর ছাদে ২০০ কেজি লাল টকটকে মরিচ শুকানোর লাইভ ভ্লগ!',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1532135771963-d8617e1ba7edd?auto=format&fit=crop&q=80&w=800',
      description: 'Vlog of our beautiful roof-top drying process. Watch us sift, inspect, and grind dried chilli and fresh turmeric live.',
      description_bn: 'খামারের উন্মুক্ত ছাদে লাল মরিচ বাছাই, রোদে মেলে দেওয়া ও মিলে নিয়ে ভাঙানোর সম্পূর্ণ অর্গানিক প্রসেস।'
    }
  }
];
