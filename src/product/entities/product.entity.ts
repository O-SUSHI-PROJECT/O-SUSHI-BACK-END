export class Product {
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

  constructor(props: Partial<Product>) {
    Object.assign(this, props);
  }
} 