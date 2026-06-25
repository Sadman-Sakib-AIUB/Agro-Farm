import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// A clean dictionary covering all UI copy for Doyel Agro
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.contact': 'Contact Us',
    'nav.login': 'Login / Register',
    'nav.logout': 'Logout',
    'nav.myAccount': 'My Account',
    'nav.cart': 'Cart',
    
    // Hero Banner text
    'hero.badge': '• Pure & Fresh From Manikganj, Bangladesh',
    'hero.title.1': 'Agricultural',
    'hero.title.2': 'Investment',
    'hero.title.sub': 'farming starts with smarter insights. Discover premium farm-fresh organic food from Manikganj delivered straight to your doorstep.',
    'hero.btn.start': 'Start Shopping',
    'hero.btn.vlog': 'Meet our Vlogger',
    'hero.showcase.label': 'Premium - Original Mustard Oil',
    'hero.showcase.desc': 'Our vlogger recommends 100% wood-pressed pure mustard oil.',
    
    // Partners Section
    'partners.title': 'Trusted by 12,000+ happy families & organic food lovers',
    
    // Beautiful Inline Images Sentence Section
    'sentence.badge': '• About Our Approach',
    'sentence.part1': 'The challenges ',
    'sentence.part2': ' farmers and rural communities',
    'sentence.part3': ' face can be effectively overcome through smart ',
    'sentence.part4': ' agricultural innovation & honest production.',
    'sentence.btn.smart': 'Smart Farming',
    'sentence.btn.growth': 'Sustainable Growth',
    'sentence.btn.agri': 'Agri Innovation',
    'sentence.btn.harvest': 'Future Harvest',

    // Shop Catalog
    'shop.title': 'Doyel Agro Store',
    'shop.subtitle': '100% chemical-free, wood-pressed, and handpicked premium food items from Manikganj farms.',
    'shop.category.all': 'All Products',
    'shop.category.ghee-oils': 'Pure Oils & Ghee',
    'shop.category.honey-sweets': 'Natural Honey & Sweets',
    'shop.category.spices': 'Organic Spices',
    'shop.search.placeholder': 'Search organic pure mustard oil, honey...',
    'shop.sort.label': 'Sort by:',
    'shop.sort.default': 'Default Sorting',
    'shop.sort.priceAsc': 'Price: Low to High',
    'shop.sort.priceDesc': 'Price: High to Low',
    'shop.results.found': 'organic products found',
    'shop.results.none': 'No products matches your search. Try adjusting the filter.',
    
    // Product Detail
    'product.back': 'Back to Store',
    'product.vloggerNote': 'Vlogger Note',
    'product.size': 'Select Pack Size',
    'product.quantity': 'Quantity',
    'product.addToCart': 'Add to Cart',
    'product.buyNow': 'Buy Now',
    'product.added': 'Added to Cart !',
    'product.reviews': 'Verified Customer Reviews',
    'product.vlogCoverage': 'YouTube Vlog Coverage - Direct from the Farm!',
    'product.vlogWatch': 'Watch Vlog On YouTube',
    'product.vlogVerified': 'Farm Verified',
    'product.specs': 'Product Highlights',
    'product.origin': 'Origin: Manikganj, Bangladesh',
    'product.purity': 'Purity Level: 100% Organic & Preservative-Free',

    // Cart Drawer
    'cart.title': 'Your Food Basket',
    'cart.empty': 'Your basket is currently empty. Add pure goods from our shop to start!',
    'cart.option': 'Size',
    'cart.itemsCount': 'items loaded',
    'cart.subtotal': 'Subtotal',
    'cart.delivery': 'Delivery (In Dhaka / Out of Dhaka)',
    'cart.deliveryNotice': 'Manikganj/Dhaka home delivery inside 24-48 hours.',
    'cart.freeShipping': 'Free shipping over ৳2000 ordered items!',
    'cart.checkout': 'Proceed to Checkout ৳',
    'cart.continue': 'Continue Shopping',

    // Checkout
    'checkout.title': 'Complete Your Order',
    'checkout.subtitle': 'Secure checkout. Cash on Delivery valid nationwide.',
    'checkout.contactInfo': '1. Contact & Shipping Details',
    'checkout.fullName': 'Full Name',
    'checkout.phone': 'Mobile Phone Number',
    'checkout.phoneHint': 'For order confirmation SMS and delivery coordination',
    'checkout.district': 'District / Location',
    'checkout.districtDhaka': 'Dhaka City (৳80 Delivery)',
    'checkout.districtManikganj': 'Manikganj Region (৳50 Delivery)',
    'checkout.districtOutside': 'Other Districts (৳130 Delivery)',
    'checkout.shippingAddress': 'Detailed Delivery Address',
    'checkout.addressHint': 'House number, Road, Village, Union, Upazila',
    'checkout.paymentMethod': '2. Select Payment Mode',
    'checkout.codTitle': 'Cash on Delivery',
    'checkout.codDesc': 'Pay with cash at your doorstep when products arrive',
    'checkout.bkashTitle': 'bKash Account Transfer',
    'checkout.bkashDesc': 'Please send payment to 01712-345678 and input txnId below',
    'checkout.nagadTitle': 'Nagad Multi-Account',
    'checkout.nagadDesc': 'Please transfer to 01712-345678 Merchant and state reference',
    'checkout.txnIdLabel': 'bKash/Nagad Transaction ID',
    'checkout.txnIdPlaceholder': 'e.g. K8H2J9W24',
    'checkout.reviewOrder': '3. Order Summary',
    'checkout.totalGoods': 'Total Goods Cost',
    'checkout.deliveryCost': 'Home Delivery Cost',
    'checkout.netTotal': 'Net Total To Pay',
    'checkout.placeOrder': 'Confirm & Place Order (৳',
    'checkout.backCart': 'Refactor Cart Basket',

    // Order Confirmation
    'conf.success': 'Alhamdulillah! Order Placed',
    'conf.orderId': 'Your Order Reference Key:',
    'conf.greeting': 'Thank you for choosing pure food, ',
    'conf.body': 'Our farmers are preparing your handpicked organic goods. We will contact you at your mobile number within 2 hours to verify and dispatch.',
    'conf.deliveryEstimate': 'Estimated Delivery Time: 24 to 48 Hours maximum',
    'conf.itemsOrdered': 'Items Ordered',
    'conf.shippingTo': 'Shipping Destination',
    'conf.backHome': 'Return Home Page',

    // Contact Page
    'contact.title': 'Contact Doyel Agro Manikganj',
    'contact.subtitle': 'Have queries about our source farmers or need bulk orders? Get in prompt touch!',
    'contact.formHeader': 'Drop Us a Message',
    'contact.email': 'Your Email Address',
    'contact.subject': 'Subject',
    'contact.message': 'Detail Message',
    'contact.btnSubmit': 'Send Message',
    'contact.sentSuccess': 'Thank you! Your inquiry was sent successfully. We will email/call you soon.',
    'contact.addressTitle': 'Main Farm Office',
    'contact.addressDesc': 'Baira Village, Singair, Manikganj, Dhaka Division',
    'contact.phoneTitle': 'Hotline For Orders',
    'contact.hoursTitle': 'Operation Schedule',
    'contact.hoursDesc': 'Saturday - Thursday: 8:00 AM to 9:00 PM',

    // Auth Page
    'auth.titleLogin': 'Sign In to Doyel Agro',
    'auth.titleRegister': 'Create Farm Account',
    'auth.subtitleLogin': 'Welcome back! Access your account, track orders, and reorder pure foods.',
    'auth.subtitleRegister': 'Join our community of happy families sourcing pure, wood-pressed food items.',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.name': 'Your Full Name',
    'auth.phone': 'Mobile Number',
    'auth.btnSubmitLogin': 'Sign In',
    'auth.btnSubmitRegister': 'Register Now',
    'auth.switchRegister': 'Don\'t have an account? Register',
    'auth.switchLogin': 'Already have an account? Sign In',
    'auth.remember': 'Keep me signed in',
    'auth.successLogin': 'Welcome back! Signed in successfully.',
    'auth.successRegister': 'Account created successfully! Welcome to Doyel Agro.',
    'auth.guest': 'Continue as Guest',
  },
  bn: {
    // Navigation
    'nav.home': 'মূল পাতা',
    'nav.shop': 'দোকান',
    'nav.contact': 'যোগাযোগ করুন',
    'nav.login': 'লগইন / রেজিস্টার',
    'nav.logout': 'লগআউট',
    'nav.myAccount': 'আমার অ্যাকাউন্ট',
    'nav.cart': 'কার্ট',
    
    // Hero Banner text
    'hero.badge': '• মানিকগঞ্জের খাঁটি ও ঐতিহ্যবাহী অর্গানিক খাদ্য উপাদান',
    'hero.title.1': 'কৃষিজাত',
    'hero.title.2': 'উদ্যোগ ও বিনিয়োগ',
    'hero.title.sub': 'সঠিক কৃষিজ প্রযুক্তি দিয়ে আমাদের পথচলা। মানিকগঞ্জের খামার থেকে শতভাগ কেমিক্যালমুক্ত ও পুষ্টিকর খাবার সরাসরি পৌঁছে যাচ্ছে আপনার ঘরে।',
    'hero.btn.start': 'কেনাকাটা করুন',
    'hero.btn.vlog': 'খামার ভ্লগ দেখুন',
    'hero.showcase.label': 'প্রিমিয়াম - কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল',
    'hero.showcase.desc': 'আমাদের ভ্লগারের পরামর্শে ১০০% খাটি কাঠের ঘানিতে পিষে তৈরি সরিষার তেল।',
    
    // Partners Section
    'partners.title': '১২,০০০+ সন্তুষ্ট পরিবার ও খাঁটি খাবার প্রেমীদের প্রথম পছন্দ',
    
    // Beautiful Inline Images Sentence Section
    'sentence.badge': '• আমাদের দৃষ্টিভঙ্গি',
    'sentence.part1': 'প্রান্তিক চাষী ',
    'sentence.part2': ' ও দেশের গ্রামীণ অঞ্চলের',
    'sentence.part3': ' বড় চ্যালেঞ্জগুলো আধুনিক প্রযুক্তি ও ',
    'sentence.part4': ' কৃষিজাত উদ্ভাবনের মাধ্যমে খুব সহজেই সমাধান করা সম্ভব।',
    'sentence.btn.smart': 'স্মার্ট ফার্মিং',
    'sentence.btn.growth': 'টেকসই উন্নয়ন',
    'sentence.btn.agri': 'কৃষি উদ্ভাবন',
    'sentence.btn.harvest': 'ভবিষ্যত ফসল',

    // Shop Catalog
    'shop.title': 'দোয়েল এগ্রো শোরুম',
    'shop.subtitle': 'রাসায়নিক মুক্ত, খাঁটি কাঠের ঘানিতে ভাঙা তেল ও মানিকগঞ্জের খামারিদের তরফ থেকে সংগৃহীত পুষ্টিকর খাদ্য।',
    'shop.category.all': 'সকল পণ্য',
    'shop.category.ghee-oils': 'খাঁটি তেল ও ঘি',
    'shop.category.honey-sweets': 'প্রাকৃতিক মধু ও মিষ্টি',
    'shop.category.spices': 'খাঁটি মশলাপাতি',
    'shop.search.placeholder': 'খাঁটি সরিষার তেল, লিচু ফুলের মধু খুঁজুন...',
    'shop.sort.label': 'ক্রম সাজান:',
    'shop.sort.default': 'সাধারণ ক্রম',
    'shop.sort.priceAsc': 'মূল্য: কম থেকে বেশি',
    'shop.sort.priceDesc': 'মূল্য: বেশি থেকে কম',
    'shop.results.found': 'টি খাঁটি পণ্য পাওয়া গেছে',
    'shop.results.none': 'কোনো পণ্য খুঁজে পাওয়া যায়নি। অনুসন্ধান পরিবর্তন করে চেষ্টা করুন।',
    
    // Product Detail
    'product.back': 'দোকানে ফিরে যান',
    'product.vloggerNote': 'ভ্লগারের মতামত',
    'product.size': 'প্যাকেজ সাইজ নির্বাচন করুন',
    'product.quantity': 'পরিমাণ',
    'product.addToCart': 'ঝুড়িতে যুক্ত করুন',
    'product.buyNow': 'সরাসরি অর্ডার করুন',
    'product.added': 'ঝুড়িতে যুক্ত হয়েছে !',
    'product.reviews': 'গ্রাহকদের মতামত ও রিভিউ',
    'product.vlogCoverage': 'সরাসরি ইউটিউব ভ্লগ ভিডিও - খামার থেকেই!',
    'product.vlogWatch': 'ইউটিউবে ভ্লগ দেখুন',
    'product.vlogVerified': 'খামার ভেরিফায়েড',
    'product.specs': 'পণ্যের বৈশিষ্ট্যসমূহ',
    'product.origin': 'উৎস: সিংগাইর, মানিকগঞ্জ, বাংলাদেশ',
    'product.purity': 'বিশুদ্ধতা: ১০০% প্রাকৃতিক এবং প্রিজারভেটিভ-মুক্ত',

    // Cart Drawer
    'cart.title': 'আপনার খাবারের ঝুড়ি',
    'cart.empty': 'আপনার ঝুড়ি বর্তমানে খালি আছে। শুরু করতে আমাদের দোকান থেকে খাঁটি পণ্য যুক্ত করুন!',
    'cart.option': 'সাইজ',
    'cart.itemsCount': 'টি আইটেম যুক্ত রয়েছে',
    'cart.subtotal': 'উপ-মোট মূল্য',
    'cart.delivery': 'ডেলিভারি চার্জ (ঢাকা/ঢাকার বাইরে)',
    'cart.deliveryNotice': 'মানিকগঞ্জ ও ঢাকা সিটিতে ২৪-৪৮ ঘণ্টার মধ্যে হোম ডেলিভারি।',
    'cart.freeShipping': '৳২০০০ বা তার বেশি অর্ডারে ফ্রী ডেলিভারি!',
    'cart.checkout': 'অর্ডার করতে এগিয়ে যান ৳',
    'cart.continue': 'কেনাকাটা চালিয়ে যান',

    // Checkout
    'checkout.title': 'অর্ডারটি চূড়ান্ত করুন',
    'checkout.subtitle': 'নিরাপদ এবং ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে মূল্য দিন)।',
    'checkout.contactInfo': '১. আপনার নাম ও ঠিকানা প্রদান করুন',
    'checkout.fullName': 'আপনার পূর্ণ নাম',
    'checkout.phone': 'মোবাইল ফোন নাম্বার',
    'checkout.phoneHint': 'অর্ডার নিশ্চিতকরণ ও ডেলিভারি সমন্বয়ের জন্য',
    'checkout.district': 'জেলা / এলাকা',
    'checkout.districtDhaka': 'ঢাকা শহর (৳৮০ ডেলিভারি)',
    'checkout.districtManikganj': 'মানিকগঞ্জ জেলা (৳৫০ ডেলিভারি)',
    'checkout.districtOutside': 'অন্যান্য জেলাসমূহ (৳১৩০ ডেলিভারি)',
    'checkout.shippingAddress': 'বিস্তারিত ডেলিভারি ঠিকানা',
    'checkout.addressHint': 'বাসা নং, রোড, গ্রাম, ইউনিয়ন, উপজেলা উল্লেখ করুন',
    'checkout.paymentMethod': '২. পেমেন্ট মোড নির্বাচন করুন',
    'checkout.codTitle': 'ক্যাশ অন ডেলিভারি (হাতে পেয়ে টাকা)',
    'checkout.codDesc': 'পণ্য যখন আপনার দোরগোড়ায় পৌঁছাবে তখন বুঝে নিয়ে পেমেন্ট করুন',
    'checkout.bkashTitle': 'বিকাশ অ্যাকাউন্ট ট্রান্সফার',
    'checkout.bkashDesc': 'দয়া করে ০১৭১২-৩৪৫৬৭৮ নাম্বারে টাকা পাঠিয়ে নিচে ট্রানজেকশন আইডি দিন',
    'checkout.nagadTitle': 'নগদ ট্রানজেকশন',
    'checkout.nagadDesc': 'দয়া করে আমাদের ০১৭১২-৩৪৫৬৭৮ মার্চেন্ট নাম্বারে পে করুন',
    'checkout.txnIdLabel': 'বিকাশ/নগদ ট্রানজেকশন আইডি (TxnID)',
    'checkout.txnIdPlaceholder': 'যেমন: K8H2J9W24',
    'checkout.reviewOrder': '৩. অর্ডার বিবরণী',
    'checkout.totalGoods': 'পণ্যের সর্বমোট মূল্য',
    'checkout.deliveryCost': 'ডেলিভারি খরচ',
    'checkout.netTotal': 'সর্বমোট প্রদেয় মূল্য',
    'checkout.placeOrder': 'অর্ডারটি কনফার্ম করুন (৳',
    'checkout.backCart': 'কার্ট পরিবর্তন করুন',

    // Order Confirmation
    'conf.success': 'আলহামদুলিল্লাহ! অর্ডার সফল হয়েছে',
    'conf.orderId': 'আপনার অর্ডার আইডি নাম্বার:',
    'conf.greeting': 'খাঁটি খাবার বেছে নেয়ার জন্য ধন্যবাদ, ',
    'conf.body': 'আমাদের খামারিরা আপনার কাঙ্ক্ষিত পণ্যটি সুন্দরভাবে প্রস্তুত করছেন। আমরা আপনার মোবাইল নম্বরে ২ ঘণ্টার মধ্যে কল করে ঠিকানা নিশ্চিত করব।',
    'conf.deliveryEstimate': 'ডেলিভারি সময়সীমা: ২৪ থেকে সর্বোচ্চ ৪৮ ঘণ্টা মাত্র',
    'conf.itemsOrdered': 'অর্ডার করা পণ্যসমূহ',
    'conf.shippingTo': 'ডেলিভারি ঠিকানা',
    'conf.backHome': 'হোম পেজে ফিরে যান',

    // Contact Page
    'contact.title': 'দোয়েল এগ্রোর সাথে যোগাযোগ',
    'contact.subtitle': 'আমাদের কৃষক, খামার কিংবা পাইকারি অর্ডার সম্পর্কে কোনো প্রশ্ন আছে? আমাদের সাথে যোগাযোগ করুন!',
    'contact.formHeader': 'আমাদের কাছে বার্তা পাঠান',
    'contact.email': 'আপনার ইমেইল ঠিকানা',
    'contact.subject': 'বিষয়',
    'contact.message': 'বার্তার বিবরণ',
    'contact.btnSubmit': 'বার্তা পাঠান',
    'contact.sentSuccess': 'ধন্যবাদ! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।',
    'contact.addressTitle': 'প্রধান খামার কার্যালায়',
    'contact.addressDesc': 'বায়রা গ্রাম, সিংগাইর, মানিকগঞ্জ, ঢাকা বিভাগ',
    'contact.phoneTitle': 'অর্ডারের হটলাইন',
    'contact.hoursTitle': 'কার্যভারের সময়',
    'contact.hoursDesc': 'শনিবার - বৃহস্পতিবার: সকাল ৮:০০ টা থেকে রাত ৯:০০ টা',

    // Auth Page
    'auth.titleLogin': 'দোয়েল এগ্রো অ্যাকাউন্টে প্রবেশ',
    'auth.titleRegister': 'নতুন খামার অ্যাকাউন্ট খুলুন',
    'auth.subtitleLogin': 'স্বাগতম! আপনার অ্যাকাউন্টে লগইন করুন, পূর্বের অর্ডার ট্র্যাক করুন এবং অর্ডার করুন।',
    'auth.subtitleRegister': 'মানিকগঞ্জের সতেজ এবং ঐতিহ্যবাহী কাঠের ঘানি ভাঙা পণ্য সহজে পাওয়ার জন্য যুক্ত হোন।',
    'auth.email': 'ইমেইল ঠিকানা',
    'auth.password': 'পাসওয়ার্ড',
    'auth.name': 'আপনার পুরো নাম',
    'auth.phone': 'মোবাইল নম্বর',
    'auth.btnSubmitLogin': 'প্রবেশ করুন',
    'auth.btnSubmitRegister': 'রেজিস্ট্রেশন করুন',
    'auth.switchRegister': 'কোনও অ্যাকাউন্ট নেই? খুলুন',
    'auth.switchLogin': 'ইতিমধ্যে অ্যাকাউন্ট আছে? প্রবেশ করুন',
    'auth.remember': 'আমাকে সাইন ইন করে রাখুন',
    'auth.successLogin': 'অ্যাকাউন্টে সফলভাবে প্রবেশ করেছেন!',
    'auth.successRegister': 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! দোয়েল এগ্রোতে স্বাগতম।',
    'auth.guest': 'অতিথি হিসেবে এগিয়ে যান',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('doyel_lang');
    return (saved === 'en' || saved === 'bn') ? saved : 'bn'; // Default to Bengali for local flavor or English, let's allow switching
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('doyel_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Switch font class on html tag
  useEffect(() => {
    const root = document.documentElement;
    if (language === 'bn') {
      root.classList.remove('font-lang-en');
      root.classList.add('font-lang-bn');
    } else {
      root.classList.remove('font-lang-bn');
      root.classList.add('font-lang-en');
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
