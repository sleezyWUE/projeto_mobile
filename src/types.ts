export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export type Category = 
  | 'mens-shirts' | 'mens-shoes' | 'mens-watches'
  | 'womens-bags' | 'womens-dresses' | 'womens-jewellery' | 'womens-shoes' | 'womens-watches';

export type Gender = 'male' | 'female';
