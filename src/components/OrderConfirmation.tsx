import React from 'react';
import { RouteState, OrderDetails } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, Calendar, HeartHandshake, Film, ExternalLink } from 'lucide-react';

interface OrderConfirmationProps {
  orderId: string;
  lastOrder: OrderDetails | null;
  onNavigate: (route: RouteState) => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId, lastOrder, onNavigate }) => {
  const { language } = useLanguage();
  
  const orderNumber = orderId || (lastOrder ? lastOrder.id : 'DYA-583019');
  const details = lastOrder || {
    customerName: language === 'bn' ? 'সম্মানিত খামার বন্ধু' : 'Dear Sourced Friend',
    phone: '01700-000000',
    district: 'Dhaka',
    shippingAddress: 'Provided shipping address',
    paymentMethod: 'cod',
    items: [],
    deliveryFee: 80,
    totalAmount: 1180,
    orderDate: new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  };

  return (
    <div id="order-confirmation-view" className="bg-[#FAF8F5] pt-32 pb-24 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Success animation indicator details */}
        <div className="space-y-3 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 relative shadow-inner">
            <span className="absolute inset-0 rounded-full bg-emerald-155 animate-ping opacity-75"></span>
            <CheckCircle size={32} className="stroke-[2.5] relative z-10 text-emerald-800" />
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3F20] tracking-tight">
            {language === 'bn' ? 'অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!' : 'Order Transmitted Successfully!'}
          </h1>
          <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed font-light">
            {language === 'bn' 
              ? 'আমাদের খামার পরিবার আপনার ভেজালমুক্ত অর্গানিক পণ্যসমূহ নিরাপদে প্রস্তুত করছে। আগামী ২-৩ দিনের মধ্যে আপনার ঠিকানায় পৌঁছে দেওয়া হবে।' 
              : 'Our farmstead is packaging your unadulterated batch carefully. Fresh shipping will reach your home in 2-3 calendar days.'}
          </p>
        </div>

        {/* Order Receipt Details Card */}
        <div className="bg-white rounded-3xl border border-neutral-100 p-6 sm:p-8 text-left shadow-lg space-y-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-150 pb-4 gap-4">
            <div>
              <span className="text-[10px] text-neutral-400 font-mono block uppercase">
                {language === 'bn' ? 'অর্ডার ট্র্যাকিং আইডি' : 'UNIQUE ORDER ID'}
              </span>
              <span className="text-lg font-mono font-bold text-[#1E3F20]">{orderNumber}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-neutral-500 font-sans">
              <Calendar size={15} className="text-[#D4A373]" />
              <span>{details.orderDate}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-neutral-150">
            
            {/* Delivery address details */}
            <div className="space-y-1.5 text-xs sm:text-sm">
              <span className="block text-[10px] text-neutral-400 font-mono uppercase font-bold">
                {language === 'bn' ? 'ডেলিভারি ঠিকানা ও গ্রাহক:' : 'SHIPPING CUSTOMER DETAILS:'}
              </span>
              <p className="text-base font-bold text-neutral-800">{details.customerName}</p>
              <p className="text-neutral-600 font-mono font-bold text-xs">Mobile: {details.phone}</p>
              <p className="text-neutral-500 mt-1 italic leading-normal font-light">{details.shippingAddress} ({details.district})</p>
            </div>

            {/* Bill accounting segment */}
            <div className="space-y-2 text-xs sm:text-sm bg-neutral-50/50 p-4 rounded-2xl border border-neutral-150/50">
              <span className="block text-[10px] text-neutral-400 font-mono uppercase font-bold mb-1">
                {language === 'bn' ? 'রসিদ ও বিল বিবরণী:' : 'RECEIPT INVOICE BREAKDOWN:'}
              </span>
              <div className="flex justify-between">
                <span className="text-neutral-500">{language === 'bn' ? 'পণ্য মূল্য:' : 'Goods Subtotal:'}</span>
                <span className="font-semibold font-mono">৳ {details.totalAmount - details.deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">{language === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery Cost:'}</span>
                <span className="font-semibold font-mono">৳ {details.deliveryFee}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-1.5 font-bold text-[#1E3F20]">
                <span>{language === 'bn' ? 'সর্বমোট প্রদেয় বিল:' : 'Total Charge:'}</span>
                <span className="font-mono">৳ {details.totalAmount}</span>
              </div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase mt-1">
                {language === 'bn' ? 'পেমেন্ট পদ্ধতি: ' : 'Payment Method: '}
                <span className="font-bold text-[#1E3F20]">{details.paymentMethod.toUpperCase()}</span>
              </div>
            </div>

          </div>

          <div className="flex items-start gap-3 text-xs text-neutral-500 leading-relaxed font-sans font-light text-left">
            <HeartHandshake size={20} className="text-[#D4A373] flex-shrink-0 mt-0.5" />
            <p>
              {language === 'bn' 
                ? 'মানিকগঞ্জ সদর খামার থেকে আমাদের প্যাকিং টিম ২৪ ঘণ্টার মধ্যে পণ্যসমূহ নিরাপদ জারে ভরে রওনা করবে। যেকোনো সহায়তা বা জরুরি পরিবর্তনের জন্য আমাদের কাস্টমার কেয়ারে কল করতে পারেন। অর্গানিক বেছে নেওয়ার জন্য ধন্যবাদ!' 
                : 'Our preparation team is wrapping your unadulterated food packages cleanly. A farm leader will reach out shortly via phone voice call to align delivery times. Thank you for voting for clean local agriculture with your trusted coin!'}
            </p>
          </div>

        </div>

        {/* Next Step Vlog Integration */}
        <div className="bg-[#1E3F20] p-6 sm:p-8 rounded-3xl text-white relative overflow-hidden shadow-md flex flex-col md:flex-row items-center justify-between text-left gap-6 border border-[#D4A373]/20">
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 text-[#D4A373]">
              <Film size={16} />
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest">
                {language === 'bn' ? 'ইউটিউব খামার ডায়েরি' : 'FARMHOUSE VLOGS'}
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
              {language === 'bn' ? 'আমাদের নিত্যদিনের খামার ভ্রমণ দেখুন সরাসরি ভিডিও ব্লগে!' : 'Catch up on our Duplex Homestead vlogs live on YouTube!'}
            </h3>
            <p className="text-white/85 text-xs font-sans max-w-xl leading-relaxed font-light">
              {language === 'bn' 
                ? 'শর্ষে দানা ভাঙার দৃশ্য, গরুর খড় খাওয়ার লাইভ শট এবং খাঁটি মধু আহরণ প্রক্রিয়া নিয়মিত আমাদের ইউটিউব চ্যানেলে আপলোড হয়। সাবস্ক্রাইব করে পরিবারের সদস্য হয়ে যান!' 
                : 'While we label your fresh honey glass bottle, observe our latest agricultural chores, chickens feeding, and organic honey harvest clips on the channel. True Manikganj warmth is shared daily!'}
            </p>
          </div>
          
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center space-x-2 py-3 px-5 rounded-xl font-sans text-xs sm:text-sm font-bold bg-[#D4A373] hover:bg-[#c49363] text-[#1E3F20] shadow-md hover:scale-103 transition-all cursor-pointer group"
          >
            <span>{language === 'bn' ? 'ইউটিউব চ্যানেল ভিজিট করুন' : 'Watch Vlogs on YouTube'}</span>
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        <div>
          <button
            onClick={() => onNavigate({ page: 'landing' })}
            className="px-6 py-3 rounded-2xl border border-neutral-200 hover:border-[#1E3F20] text-neutral-600 hover:text-[#1E3F20] text-sm font-bold transition-colors cursor-pointer"
          >
            {language === 'bn' ? 'হোমপেজে ফিরে যান' : 'Return to Homepage'}
          </button>
        </div>

      </div>
    </div>
  );
};
