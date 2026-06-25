export interface ProductOption {
  label: string;
  label_bn: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  name_bn: string;
  category: 'ghee-oils' | 'honey-sweets' | 'spices';
  categoryLabel: string;
  categoryLabel_bn: string;
  price: number; // Base price for default option
  options: ProductOption[];
  shortDescription: string;
  shortDescription_bn: string;
  description: string;
  description_bn: string;
  imageUrl: string;
  images: string[];
  stockBadge: string;
  stockBadge_bn: string;
  vloggerNote: string;
  vloggerNote_bn: string;
  featuredInVlog?: {
    title: string;
    title_bn: string;
    videoUrl: string;
    thumbnailUrl: string;
    description: string;
    description_bn: string;
  };
}

export interface CartItem {
  product: Product;
  selectedOption: ProductOption;
  quantity: number;
}

export type ActivePage = 'landing' | 'shop' | 'product-details' | 'checkout' | 'confirmation' | 'contact' | 'auth' | 'dashboard';

export interface RouteState {
  page: ActivePage;
  productId?: string;
  orderId?: string;
}

export interface OrderDetails {
  id: string;
  customerName: string;
  phone: string;
  district: string;
  shippingAddress: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  items: CartItem[];
  deliveryFee: number;
  totalAmount: number;
  orderDate: string;
}
