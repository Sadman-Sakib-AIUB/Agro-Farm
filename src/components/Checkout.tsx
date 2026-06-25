import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { RouteState, OrderDetails } from '../types';
import { CreditCard, Phone, MapPin, Truck, ShieldCheck, ArrowRight, CornerDownRight, CheckCircle } from 'lucide-react';

interface CheckoutProps {
  onNavigate: (route: RouteState) => void;
  onSetLastOrder: (order: OrderDetails) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onNavigate, onSetLastOrder }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { t, language } = useLanguage();

  // Redirect to shop if basket empties out
  if (cartItems.length === 0) {
    return (
      <div id="checkout-empty-state" className="bg-[#FAF8F5] pt-40 pb-24 min-h-screen text-center space-y-4 font-sans">
        <h2 className="font-serif text-2xl font-bold text-[#1E3F20]">{t('cart.empty')}</h2>
        <button
          onClick={() => onNavigate({ page: 'shop' })}
          className="px-5 py-2.5 rounded-xl text-white bg-[#1E3F20] hover:bg-[#2c542e] cursor-pointer transition-colors inline-block"
        >
          {t('cart.continue')}
        </button>
      </div>
    );
  }

  const [customerName, setCustomerName] = useState(() => {
    return localStorage.getItem('doyel_active_user') || '';
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [bkashTxn, setBkashTxn] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getDeliveryFee = () => {
    if (district.toLowerCase() === 'manikganj') return 50;
    if (district.toLowerCase() === 'dhaka') return 80;
    return 130; 
  };

  const deliveryFee = getDeliveryFee();
  const isFreeShipping = cartTotal >= 2000;
  const netDeliveryFee = isFreeShipping ? 0 : deliveryFee;
  const totalAmount = cartTotal + netDeliveryFee;

  const getManualPaymentInstructions = () => {
    const serviceName = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';
    return (
      <div className="mt-4 p-4 rounded-2xl bg-[#D4A373]/10 border border-[#D4A373]/30 text-xs sm:text-sm text-neutral-800 space-y-3">
        <div className="font-bold flex items-center gap-1.5 text-[#1E3F20]">
          <CornerDownRight size={15} />
          <span>{language === 'bn' ? `${serviceName} পেমেন্ট নির্দেশনা:` : `${serviceName} Payment Instructions:`}</span>
        </div>
        <p className="leading-relaxed font-light">
          {language === 'bn' ? (
            <>
              দয়া করে আপনার বিকাশ/নগদ অ্যাপ থেকে সর্বমোট <strong>৳ {totalAmount}</strong> টাকা আমাদের এই পার্সোনাল নম্বরে <strong>Send Money</strong> করুন: <strong className="text-[#1E3F20] font-mono underline">01712-345678</strong>। সফলভাবে পাঠানোর পর অ্যাপের ফিরতি মেসেজে পাওয়া ট্রানজেকশন আইডি নিচে টাইপ করুন:
            </>
          ) : (
            <>
              Please send exactly <strong>৳ {totalAmount}</strong> to our personal {serviceName} wallet: <strong>01712-345678</strong> (using Send Money). Once complete, enter your Transaction reference below:
            </>
          )}
        </p>
        <div className="space-y-1">
          <label className="block text-[10px] font-mono text-neutral-500 uppercase font-bold">
            {t('checkout.txnIdLabel')}
          </label>
          <input
            id="form-bkashTxn"
            type="text"
            value={bkashTxn}
            onChange={(e) => setBkashTxn(e.target.value)}
            placeholder={t('checkout.txnIdPlaceholder')}
            className="w-full max-w-xs bg-white border border-[#D4A373]/40 rounded-xl px-3 py-2 text-sm font-mono uppercase focus:outline-none focus:ring-1 focus:ring-[#1E3F20] focus:border-[#1E3F20]"
          />
        </div>
      </div>
    );
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) newErrors.customerName = language === 'bn' ? 'অনুগ্রহ করে আপনার পুরো নাম লিখুন।' : 'Please enter your full name.';
    
    const cleanPhone = phoneNumber.replace(/[-\s]/g, '');
    if (!cleanPhone) {
      newErrors.phoneNumber = language === 'bn' ? 'মোবাইল নম্বরটি আবশ্যক।' : 'Mobile number is required.';
    } else if (!/^(?:\+880|880|0)?1[3-9]\d{8}$/.test(cleanPhone)) {
      newErrors.phoneNumber = language === 'bn' ? 'সঠিক বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 01712345678)' : 'Please enter a valid Bangladeshi mobile number.';
    }

    if (!address.trim()) newErrors.address = language === 'bn' ? 'অনুগ্রহ করে বিস্তারিত ঠিকানা বা ডেলিভারি স্থানটি লিখুন।' : 'Please enter your full road and house delivery address.';

    if (paymentMethod !== 'cod' && !bkashTxn.trim()) {
      newErrors.bkashTxn = language === 'bn' ? 'দয়া করে ট্রানজেকশন আইডি বা TxnID প্রদান করুন।' : 'Please provide the transaction ID for verification.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementById(`form-${firstErrorKey}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const orderId = `DYA-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDetails: OrderDetails = {
      id: orderId,
      customerName,
      phone: phoneNumber,
      district,
      shippingAddress: address,
      paymentMethod,
      items: [...cartItems],
      deliveryFee: netDeliveryFee,
      totalAmount,
      orderDate: new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    onSetLastOrder(orderDetails);
    clearCart();
    onNavigate({ page: 'confirmation', orderId });
  };

  return (
    <div id="checkout-view" className="bg-[#FAF8F5] pt-32 pb-24 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title details */}
        <div className="mb-10 text-left">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3F20] tracking-tight">
            {t('checkout.title')}
          </h1>
          <p className="text-sm text-neutral-500 font-light mt-1">
            {t('checkout.subtitle')}
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Contact details */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-100 shadow-sm space-y-5">
              <h2 className="text-[#1E3F20] font-serif text-lg font-bold border-b border-neutral-100 pb-3 flex items-center gap-2">
                <Phone size={18} className="text-[#D4A373]" />
                <span>{t('checkout.contactInfo')}</span>
              </h2>

              {/* Name field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-neutral-700">{t('checkout.fullName')}</label>
                <input
                  id="form-customerName"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: সাকিব আল হাসান' : 'e.g. Shakib Al Hasan'}
                  className={`w-full bg-neutral-50/50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3F20] focus:bg-white text-neutral-900 ${
                    errors.customerName ? 'border-rose-300 ring-rose-300' : 'border-neutral-200'
                  }`}
                />
                {errors.customerName && <p className="text-rose-600 text-xs font-semibold">{errors.customerName}</p>}
              </div>

              {/* Phone field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-neutral-700">{t('checkout.phone')}</label>
                <input
                  id="form-phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 01712-345678"
                  className={`w-full bg-neutral-50/50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3F20] focus:bg-white text-neutral-900 ${
                    errors.phoneNumber ? 'border-rose-300 ring-rose-300' : 'border-neutral-200'
                  }`}
                />
                <p className="text-[10px] text-neutral-400 font-light">{t('checkout.phoneHint')}</p>
                {errors.phoneNumber && <p className="text-rose-600 text-xs font-semibold">{errors.phoneNumber}</p>}
              </div>

              {/* District Select dropdown */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-neutral-700">{t('checkout.district')}</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3F20] focus:bg-white text-neutral-900"
                >
                  <option value="Dhaka">{t('checkout.districtDhaka')}</option>
                  <option value="Manikganj">{t('checkout.districtManikganj')}</option>
                  <option value="Outside">{t('checkout.districtOutside')}</option>
                </select>
              </div>

              {/* Detailed shipping address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-neutral-700">{t('checkout.shippingAddress')}</label>
                <textarea
                  id="form-address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t('checkout.addressHint')}
                  className={`w-full bg-neutral-50/50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3F20] focus:bg-white text-neutral-900 ${
                    errors.address ? 'border-rose-300 ring-rose-300' : 'border-neutral-200'
                  }`}
                />
                {errors.address && <p className="text-rose-600 text-xs font-semibold">{errors.address}</p>}
              </div>
            </div>

            {/* Step 2: Payment options */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-100 shadow-sm space-y-5">
              <h2 className="text-[#1E3F20] font-serif text-lg font-bold border-b border-neutral-100 pb-3 flex items-center gap-2">
                <CreditCard size={18} className="text-[#D4A373]" />
                <span>{t('checkout.paymentMethod')}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Cash on Delivery option block */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border flex flex-col justify-between cursor-pointer text-left transition-all relative ${
                    paymentMethod === 'cod'
                      ? 'border-[#1E3F20] bg-[#1E3F20]/5 text-[#1E3F20] font-semibold'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="block font-semibold text-sm">{t('checkout.codTitle')}</span>
                    <span className="block text-[11px] text-neutral-500 font-light leading-snug">{t('checkout.codDesc')}</span>
                  </div>
                  <input
                    type="radio"
                    name="paymentSelect"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="absolute top-4 right-4 text-[#1E3F20] focus:ring-[#1E3F20]"
                  />
                </label>

                {/* bKash payment block */}
                <label
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-4 rounded-2xl border flex flex-col justify-between cursor-pointer text-left transition-all relative ${
                    paymentMethod === 'bkash'
                      ? 'border-[#1E3F20] bg-[#1E3F20]/5 text-[#1E3F20] font-semibold'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="block font-semibold text-sm">{t('checkout.bkashTitle')}</span>
                    <span className="block text-[11px] text-neutral-500 font-light leading-snug">{t('checkout.bkashDesc')}</span>
                  </div>
                  <input
                    type="radio"
                    name="paymentSelect"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="absolute top-4 right-4 text-[#1E3F20] focus:ring-[#1E3F20]"
                  />
                </label>

                {/* Nagad payment block */}
                <label
                  onClick={() => setPaymentMethod('nagad')}
                  className={`p-4 rounded-2xl border flex flex-col justify-between cursor-pointer text-left transition-all relative ${
                    paymentMethod === 'nagad'
                      ? 'border-[#1E3F20] bg-[#1E3F20]/5 text-[#1E3F20] font-semibold'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="block font-semibold text-sm">{t('checkout.nagadTitle')}</span>
                    <span className="block text-[11px] text-neutral-500 font-light leading-snug">{t('checkout.nagadDesc')}</span>
                  </div>
                  <input
                    type="radio"
                    name="paymentSelect"
                    checked={paymentMethod === 'nagad'}
                    onChange={() => setPaymentMethod('nagad')}
                    className="absolute top-4 right-4 text-[#1E3F20] focus:ring-[#1E3F20]"
                  />
                </label>
              </div>

              {/* Show instructions if digital wallet */}
              {paymentMethod !== 'cod' && getManualPaymentInstructions()}
              {errors.bkashTxn && paymentMethod !== 'cod' && (
                <p className="text-rose-600 text-xs font-semibold pt-1">{errors.bkashTxn}</p>
              )}
            </div>

          </div>

          {/* Right Column: Order Basket Summary */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-105 shadow-md space-y-6">
              <h2 className="text-[#1E3F20] font-serif text-lg font-bold border-b border-neutral-100 pb-3 flex items-center gap-2">
                <Truck size={18} className="text-[#D4A373]" />
                <span>{t('checkout.reviewOrder')}</span>
              </h2>

              {/* Order products list */}
              <div className="divide-y divide-neutral-100 max-h-[240px] overflow-y-auto pr-2 space-y-3">
                {cartItems.map((item) => (
                  <div key={`${item.product.id}-${item.selectedOption.label}`} className="flex gap-4 items-center py-2.5">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-neutral-100 bg-neutral-50"
                    />
                    <div className="flex-1 text-left">
                      <h4 className="text-xs font-semibold text-neutral-800 line-clamp-1">
                        {language === 'bn' ? item.product.name_bn : item.product.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-[#D4A373] font-mono tracking-wider">
                        <span>{language === 'bn' ? item.selectedOption.label_bn : item.selectedOption.label}</span>
                        <span>•</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="font-mono text-xs font-bold text-neutral-900 text-right">
                      ৳ {item.selectedOption.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown details */}
              <div className="space-y-3 pt-4 border-t border-neutral-100 text-xs sm:text-sm">
                
                <div className="flex justify-between items-center text-neutral-600">
                  <span>{t('checkout.totalGoods')}</span>
                  <span className="font-mono font-semibold">৳ {cartTotal}</span>
                </div>
                
                <div className="flex justify-between items-center text-neutral-600">
                  <span>{t('checkout.deliveryCost')}</span>
                  <span className="font-mono font-semibold flex items-center gap-1">
                    {isFreeShipping ? (
                      <>
                        <span className="line-through text-neutral-400">৳ {deliveryFee}</span>
                        <span className="text-emerald-700 font-bold uppercase text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded-md">FREE</span>
                      </>
                    ) : (
                      `৳ ${deliveryFee}`
                    )}
                  </span>
                </div>

                {isFreeShipping && (
                  <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl text-[10px] font-sans flex items-center gap-1.5 select-none text-left leading-normal border border-emerald-100">
                    <CheckCircle size={12} className="text-emerald-600 flex-shrink-0" />
                    <span>{t('cart.freeShipping')}</span>
                  </div>
                )}

                <div className="h-[1.5px] bg-[#1E3F20]/10 my-1" />

                <div className="flex justify-between items-center text-[#1E3F20] text-base font-extrabold">
                  <span>{t('checkout.netTotal')}</span>
                  <span className="font-mono">৳ {totalAmount}</span>
                </div>
              </div>

              {/* Delivery dispatch promise notice */}
              <div className="p-3 bg-neutral-50/50 rounded-2xl border border-neutral-200/50 text-[11px] text-neutral-600 leading-normal text-left font-light">
                {t('cart.deliveryNotice')}
              </div>

              {/* Fulfill Confirm button */}
              <button
                id="btn-confirm-order-checkout"
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#1E3F20] hover:bg-[#2c542e] text-white font-bold text-sm shadow-md active:scale-95 transition-all cursor-pointer select-none"
              >
                <span>{t('checkout.placeOrder')} {totalAmount})</span>
                <ArrowRight size={16} />
              </button>

              <button
                id="btn-back-to-shop-from-checkout"
                type="button"
                onClick={() => onNavigate({ page: 'shop' })}
                className="w-full text-center text-xs font-semibold text-[#D4A373] hover:underline"
              >
                {t('checkout.backCart')}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 select-none">
              <ShieldCheck size={14} className="text-emerald-700" />
              <span>{language === 'bn' ? 'শতভাগ নিরাপদ মানিকগঞ্জ ট্রাস্ট' : '100% Genuine Manikganj Quality Promise'}</span>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
