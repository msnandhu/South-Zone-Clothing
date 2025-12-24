import imgMaroon from '../assets/images/product-maroon.jpg';
import imgPurple from '../assets/images/product-purple.jpg';
import imgWhite from '../assets/images/product-white.jpg';
import imgPants from '../assets/images/product-pants.jpg';

export const allProducts = [
    {
        id: 1,
        name: 'Maroon Button Down',
        price: 999,
        originalPrice: 1499,
        image: imgMaroon,
        tag: 'Best Seller',
        category: 'shirts',
        description: 'Crafted for effortless style and comfort, this maroon button-down shirt is a wardrobe essential. Made from soft, breathable fabric, it delivers warmth without feeling heavy. Perfect for semi-formal or casual occasions.',
        images: [imgMaroon, imgWhite, imgPurple],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 12
    },
    {
        id: 2,
        name: 'Classic Beige Trousers',
        price: 1899,
        originalPrice: 2499,
        image: imgPants,
        tag: 'New',
        category: 'pants',
        description: 'These classic beige trousers offer a perfect blend of style and comfort. The slim fit design ensures a sharp look, while the premium cotton fabric provides all-day comfort. Ideal for office wear or a smart casual look.',
        images: [imgPants, imgMaroon, imgPurple],
        sizes: ['30', '32', '34', '36'],
        stock: 8
    },
    {
        id: 3,
        name: 'Purple Formal Shirt',
        price: 1599,
        originalPrice: 1999,
        image: imgPurple,
        tag: 'Trending',
        category: 'shirts',
        description: 'Elevate your formal wardrobe with this stunning purple formal shirt. The rich color and crisp tailoring make it a standout piece. Pair it with black trousers for a sophisticated ensemble.',
        images: [imgPurple, imgMaroon, imgWhite],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 5
    },
    {
        id: 4,
        name: 'Crisp White Shirt',
        price: 2999,
        originalPrice: 3999,
        image: imgWhite,
        tag: 'Premium',
        category: 'shirts',
        description: 'A timeless classic, this crisp white shirt is made from premium linen. Its clean lines and superior fabric quality speak of luxury. A must-have for every gentleman.',
        images: [imgWhite, imgPurple, imgMaroon],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 3
    },
    {
        id: 5,
        name: 'Luxury Linen Shirt',
        price: 2199,
        originalPrice: 2799,
        image: imgWhite,
        category: 'shirts',
        description: 'Experience the ultimate comfort with our Luxury Linen Shirt. Breathable and soft, it is perfect for summer days or beach weddings. The relaxed fit ensures you stay cool and stylish.',
        images: [imgWhite, imgMaroon],
        sizes: ['M', 'L', 'XL'],
        stock: 15
    },
    {
        id: 6,
        name: 'Cargo Joggers',
        price: 1299,
        originalPrice: 1899,
        image: imgPants,
        category: 'pants',
        description: 'Combine utility with style in these Cargo Joggers. Featuring multiple pockets and a comfortable elastic waistband, they are perfect for a casual day out or lounging at home.',
        images: [imgPants, imgWhite],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 20
    },
    {
        id: 7,
        name: 'Streetwear Hoodie',
        price: 2499,
        originalPrice: 2999,
        image: imgMaroon,
        category: 't-shirts', // categorizing as t-shirts/tops for now
        description: 'Stay cozy and stylish with this premium streetwear hoodie. The oversized fit and soft fleece lining make it your go-to layer for chilly evenings.',
        images: [imgMaroon, imgPurple],
        sizes: ['M', 'L', 'XL'],
        stock: 10
    },
    {
        id: 8,
        name: 'Formal Trousers',
        price: 1799,
        originalPrice: 2299,
        image: imgPurple, // Using purple image as placeholder/variant
        category: 'pants',
        description: 'Sharp and sophisticated, these formal trousers are tailored to perfection. The wrinkle-resistant fabric ensures you look polished from morning meetings to evening dinners.',
        images: [imgPurple, imgPants],
        sizes: ['30', '32', '34', '36'],
        stock: 7
    },
    {
        id: 9,
        name: 'Slim Fit Chinos',
        price: 1899,
        originalPrice: 2499,
        image: imgPants,
        tag: 'New',
        category: 'pants',
        description: 'Versatile and stylish, these Slim Fit Chinos are a wardrobe staple. Works great with both a t-shirt for a casual look or a button-down for a smarter appearance.',
        images: [imgPants, imgWhite],
        sizes: ['30', '32', '34', '36'],
        stock: 18
    },
    {
        id: 10,
        name: 'Oxford Button Down',
        price: 1599,
        originalPrice: 1999,
        image: imgWhite,
        category: 'shirts',
        description: 'The Oxford Button Down is the definition of smart-casual. Durable yet soft, it gets better with every wash. Available in a classic fit.',
        images: [imgWhite, imgMaroon],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 25
    }
];
