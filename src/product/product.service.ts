import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Sushi California',
      description: 'Sushi tradicional com salmão, abacate e pepino',
      price: 25.90,
      category: 'Sushi',
      imageUrl: 'https://example.com/california-sushi.jpg',
      isAvailable: true,
      ingredients: ['Salmão', 'Abacate', 'Pepino', 'Arroz', 'Alga Nori'],
      preparationTime: 15,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      name: 'Temaki Salmão',
      description: 'Cone de alga recheado com salmão fresco e vegetais',
      price: 18.50,
      category: 'Temaki',
      imageUrl: 'https://example.com/temaki-salmao.jpg',
      isAvailable: true,
      ingredients: ['Salmão', 'Arroz', 'Alga Nori', 'Pepino', 'Cream Cheese'],
      preparationTime: 12,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '3',
      name: 'Sashimi Mix',
      description: 'Seleção de sashimi com salmão, atum e peixe branco',
      price: 32.00,
      category: 'Sashimi',
      imageUrl: 'https://example.com/sashimi-mix.jpg',
      isAvailable: true,
      ingredients: ['Salmão', 'Atum', 'Peixe Branco', 'Wasabi', 'Gengibre'],
      preparationTime: 8,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '4',
      name: 'Hot Roll',
      description: 'Sushi empanado e frito com salmão e cream cheese',
      price: 28.90,
      category: 'Hot Roll',
      imageUrl: 'https://example.com/hot-roll.jpg',
      isAvailable: false,
      ingredients: ['Salmão', 'Cream Cheese', 'Farinha Panko', 'Molho Teriyaki'],
      preparationTime: 20,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findByCategory(category: string): Product[] {
    return this.products.filter(p => 
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  findAvailable(): Product[] {
    return this.products.filter(p => p.isAvailable);
  }
} 