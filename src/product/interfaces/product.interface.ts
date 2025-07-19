export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  ingredients?: string[];
  preparationTime?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable?: boolean;
  ingredients?: string[];
  preparationTime?: number;
}

export interface IUpdateProduct {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  imageUrl?: string;
  isAvailable?: boolean;
  ingredients?: string[];
  preparationTime?: number;
} 