import React, { useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ShoppingBag, Zap, Star, Plus, Minus, Check, ChevronRight, ArrowLeft } from "lucide-react";
import { CartContext } from "../context/CartContext";

import greenKiwiImg from "../assets/food/green-kiwi.png";
import seedlessGrapesImg from "../assets/food/seedless-grapes.png";
import pearFruitImg from "../assets/food/pear-fruit.png";
import pinkGuavaImg from "../assets/food/pink-guava.png";
import muskmelonImg from "../assets/food/muskmelon.png";
import peachImg from "../assets/food/peach.png";

import chickenCurryImg from "../assets/food/chicken-curry.jpg";
import muttonCurryImg from "../assets/food/mutton-curry.jpg";
import fishCurryImg from "../assets/food/fish-curry.jpg";
import prawnCurryImg from "../assets/food/prawn-curry.jpg";
import crabCurryImg from "../assets/food/crab-curry.jpg";
import chickenWingsImg from "../assets/food/chicken-wings.jpg";
import chickenFryImg from "../assets/food/chicken-fry.jpg";
import fishFryImg from "../assets/food/fish-fry.jpg";
import freshLimeSodaImg from "../assets/food/fresh_lime_soda.png";
import coldCoffeeImg from "../assets/food/cold_coffee.png";
import gulabJamunImg from "../assets/food/gulab-jamun.jpg";
import iceCreamImg from "../assets/food/ice-cream.jpg";
import donutImg from "../assets/food/donut.jpg";
import dalTadkaImg from "../assets/food/dal-tadka.jpg";
import paneerButterMasalaImg from "../assets/food/paneer-butter-masala.jpg";
import chocolateBrownieImg from "../assets/food/chocolate-brownie.jpg";
import laysMagicMasalaImg from "../assets/food/lays-magic-masala.jpg";
import kurkureMasalaMunchImg from "../assets/food/kurkure-masala-munch.jpg";
import doritosNachoChipsImg from "../assets/food/doritos-nacho-chips.jpg";
import pringlesOriginalImg from "../assets/food/pringles-original.jpg";
import haldiramsAlooBhujiaImg from "../assets/food/haldirams-aloo-bhujia.jpg";
import redBullImg from "../assets/food/red-bull-energy-drink.jpg";
import daawatBasmatiRiceImg from "../assets/food/daawat-basmati-rice.jpg";

const img = (id) => `https://images.unsplash.com/${id}?w=500&h=500&fit=crop&auto=format`;

// Curated limited grocery items matching Swiggy Instamart pattern
const groceryCategoriesList = [
  { name: "Fresh Vegetables", icon: "🥦" },
  { name: "Fresh Fruits", icon: "🍎" },
  { name: "Dairy, Bread & Eggs", icon: "🥛" },
  { name: "Munchies & Snacks", icon: "🍿" },
  { name: "Cold Drinks & Juices", icon: "🥤" },
  { name: "Sweet Cravings", icon: "🍫" },
  { name: "Atta, Rice & Dals", icon: "🍚" },
  { name: "Meat & Seafood", icon: "🍗" },
];

const groceryCatalog = {
  "Fresh Vegetables": [
    {
      id: "groc-veg-1",
      name: "Hybrid Fresh Tomatoes",
      weight: "500 g",
      price: 28,
      mrp: 40,
      discount: "30% OFF",
      rating: "4.8",
      isVeg: true,
      image: img("photo-1592924357228-9564da86a77b"),
    },
    {
      id: "groc-veg-2",
      name: "Fresh Red Onions",
      weight: "1 kg",
      price: 35,
      mrp: 48,
      discount: "27% OFF",
      rating: "4.7",
      isVeg: true,
      image: img("photo-1618512496248-a07fe83aa8cb"),
    },
    {
      id: "groc-veg-3",
      name: "Fresh Farm Spinach / Palak",
      weight: "250 g",
      price: 22,
      mrp: 30,
      discount: "26% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1576045057995-568f588f82fb"),
    },
    {
      id: "groc-veg-4",
      name: "New Season Potatoes",
      weight: "1 kg",
      price: 32,
      mrp: 45,
      discount: "28% OFF",
      rating: "4.6",
      isVeg: true,
      image: img("photo-1518977676601-b53f82aba655"),
    },
    {
      id: "groc-veg-5",
      name: "Crisp Green Capsicum",
      weight: "250 g",
      price: 25,
      mrp: 35,
      discount: "28% OFF",
      rating: "4.8",
      isVeg: true,
      image: img("photo-1563565375-f3fdfdbefa83"),
    },
    {
      id: "groc-veg-6",
      name: "Sweet Orange Carrots",
      weight: "500 g",
      price: 30,
      mrp: 42,
      discount: "28% OFF",
      rating: "4.7",
      isVeg: true,
      image: img("photo-1598170845058-32b9d6a5da37"),
    },
    {
      id: "groc-veg-7",
      name: "Fresh Green Broccoli",
      weight: "1 pc (300 g)",
      price: 45,
      mrp: 60,
      discount: "25% OFF",
      rating: "4.8",
      isVeg: true,
      image: img("photo-1459411621453-7b03977f4bfc"),
    },
    {
      id: "groc-veg-8",
      name: "Green Chillies & Ginger Combo",
      weight: "200 g",
      price: 24,
      mrp: 32,
      discount: "25% OFF",
      rating: "4.6",
      isVeg: true,
      image: img("photo-1588252303782-cb80119abd6d"),
    },
  ],

  "Fresh Fruits": [
    {
      id: "groc-fruit-1",
      name: "Royal Gala Apples",
      weight: "4 pcs (600 g)",
      price: 120,
      mrp: 160,
      discount: "25% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1560806887-1e4cd0b6cbd6"),
    },
    {
      id: "groc-fruit-2",
      name: "Robusta Fresh Bananas",
      weight: "1 kg (6 pcs)",
      price: 48,
      mrp: 65,
      discount: "26% OFF",
      rating: "4.8",
      isVeg: true,
      image: img("photo-1571771894821-ce9b6c11b08e"),
    },
    {
      id: "groc-fruit-3",
      name: "Premium Green Kiwi",
      weight: "Pack of 3",
      price: 85,
      mrp: 110,
      discount: "22% OFF",
      rating: "4.9",
      isVeg: true,
      image: greenKiwiImg,
    },
    {
      id: "groc-fruit-4",
      name: "Seedless Black Grapes",
      weight: "500 g",
      price: 75,
      mrp: 100,
      discount: "25% OFF",
      rating: "4.7",
      isVeg: true,
      image: seedlessGrapesImg,
    },
    {
      id: "groc-fruit-5",
      name: "Sweet Nagpur Oranges",
      weight: "1 kg",
      price: 80,
      mrp: 110,
      discount: "27% OFF",
      rating: "4.8",
      isVeg: true,
      image: img("photo-1547514701-42782101795e"),
    },
    {
      id: "groc-fruit-6",
      name: "Fresh Whole Watermelon",
      weight: "1 pc (~2 kg)",
      price: 65,
      mrp: 90,
      discount: "27% OFF",
      rating: "4.6",
      isVeg: true,
      image: img("photo-1568158879083-c42860933ed7"),
    },
    {
      id: "groc-fruit-7",
      name: "Juicy Pink Guava",
      weight: "500 g",
      price: 55,
      mrp: 75,
      discount: "26% OFF",
      rating: "4.7",
      isVeg: true,
      image: pinkGuavaImg,
    },
    {
      id: "groc-fruit-8",
      name: "Sweet Muskmelon",
      weight: "1 pc (~1 kg)",
      price: 60,
      mrp: 80,
      discount: "25% OFF",
      rating: "4.8",
      isVeg: true,
      image: muskmelonImg,
    },
  ],

  "Dairy, Bread & Eggs": [
    {
      id: "groc-dairy-1",
      name: "Amul Taaza Toned Milk",
      weight: "1 L Pouch",
      price: 54,
      mrp: 56,
      discount: "4% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1550583724-b2692b85b150"),
    },
    {
      id: "groc-dairy-2",
      name: "Farm Fresh Table Eggs",
      weight: "Pack of 6",
      price: 52,
      mrp: 65,
      discount: "20% OFF",
      rating: "4.8",
      isVeg: false,
      image: img("photo-1506976785307-8732e854ad03"),
    },
    {
      id: "groc-dairy-3",
      name: "Amul Pasteurized Butter",
      weight: "100 g",
      price: 58,
      mrp: 60,
      discount: "3% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1589985270826-4b7bb135bc9d"),
    },
    {
      id: "groc-dairy-4",
      name: "Milky Mist Fresh Paneer",
      weight: "200 g",
      price: 90,
      mrp: 110,
      discount: "18% OFF",
      rating: "4.8",
      isVeg: true,
      image: paneerButterMasalaImg,
    },
    {
      id: "groc-dairy-5",
      name: "Mother Dairy Classic Dahi",
      weight: "400 g",
      price: 38,
      mrp: 42,
      discount: "10% OFF",
      rating: "4.7",
      isVeg: true,
      image: img("photo-1488477181946-6428a0291777"),
    },
    {
      id: "groc-dairy-6",
      name: "Amul Processed Cheese Slices",
      weight: "10 Slices (200 g)",
      price: 145,
      mrp: 170,
      discount: "14% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1486297678162-eb2a19b0a32d"),
    },
    {
      id: "groc-dairy-7",
      name: "Epigamia Greek Yogurt",
      weight: "120 g",
      price: 55,
      mrp: 65,
      discount: "15% OFF",
      rating: "4.8",
      isVeg: true,
      image: img("photo-1571212515416-fef01fc43637"),
    },
    {
      id: "groc-dairy-8",
      name: "Whole Wheat Brown Bread",
      weight: "400 g",
      price: 45,
      mrp: 50,
      discount: "10% OFF",
      rating: "4.7",
      isVeg: true,
      image: img("photo-1509440159596-0249088772ff"),
    },
  ],

  "Munchies & Snacks": [
    {
      id: "groc-snack-1",
      name: "Lay's India's Magic Masala",
      weight: "50 g",
      price: 20,
      mrp: 20,
      discount: "HOT DEAL",
      rating: "4.9",
      isVeg: true,
      image: laysMagicMasalaImg,
    },
    {
      id: "groc-snack-2",
      name: "Kurkure Masala Munch",
      weight: "90 g",
      price: 20,
      mrp: 20,
      discount: "POPULAR",
      rating: "4.8",
      isVeg: true,
      image: kurkureMasalaMunchImg,
    },
    {
      id: "groc-snack-3",
      name: "Doritos Cheese Nacho Chips",
      weight: "60 g",
      price: 30,
      mrp: 35,
      discount: "14% OFF",
      rating: "4.8",
      isVeg: true,
      image: doritosNachoChipsImg,
    },
    {
      id: "groc-snack-4",
      name: "Pringles Original Potato Crisps",
      weight: "107 g",
      price: 105,
      mrp: 125,
      discount: "16% OFF",
      rating: "4.9",
      isVeg: true,
      image: pringlesOriginalImg,
    },
    {
      id: "groc-snack-5",
      name: "Haldiram's Aloo Bhujia",
      weight: "200 g",
      price: 58,
      mrp: 68,
      discount: "14% OFF",
      rating: "4.9",
      isVeg: true,
      image: haldiramsAlooBhujiaImg,
    },
    {
      id: "groc-snack-6",
      name: "Act II Classic Salted Popcorn",
      weight: "70 g",
      price: 35,
      mrp: 40,
      discount: "12% OFF",
      rating: "4.7",
      isVeg: true,
      image: img("photo-1578849278619-e73505e9610f"),
    },
    {
      id: "groc-snack-7",
      name: "Maggi 2-Minute Noodles",
      weight: "Pack of 4 (280 g)",
      price: 56,
      mrp: 64,
      discount: "12% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1612927601601-6638404737ce"),
    },
    {
      id: "groc-snack-8",
      name: "Roasted Peri Peri Makhana",
      weight: "70 g",
      price: 89,
      mrp: 120,
      discount: "25% OFF",
      rating: "4.8",
      isVeg: true,
      image: img("photo-1508061253366-f7da158b6d46"),
    },
  ],

  "Cold Drinks & Juices": [
    {
      id: "groc-drink-1",
      name: "Coca-Cola Original Taste",
      weight: "750 ml",
      price: 40,
      mrp: 45,
      discount: "11% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1622483767028-3f66f32aef97"),
    },
    {
      id: "groc-drink-2",
      name: "Thums Up Charged Cola",
      weight: "750 ml",
      price: 40,
      mrp: 45,
      discount: "11% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1581098365948-6a5a912b7a49"),
    },
    {
      id: "groc-drink-3",
      name: "Sprite Refreshing Lemon",
      weight: "750 ml",
      price: 40,
      mrp: 45,
      discount: "11% OFF",
      rating: "4.8",
      isVeg: true,
      image: img("photo-1625772299848-391b6a87d7b3"),
    },
    {
      id: "groc-drink-4",
      name: "Red Bull Energy Drink",
      weight: "250 ml Can",
      price: 120,
      mrp: 125,
      discount: "4% OFF",
      rating: "4.9",
      isVeg: true,
      image: redBullImg,
    },
    {
      id: "groc-drink-5",
      name: "Maaza Mango Juice Drink",
      weight: "600 ml",
      price: 38,
      mrp: 42,
      discount: "10% OFF",
      rating: "4.8",
      isVeg: true,
      image: img("photo-1546173159-315724a31696"),
    },
    {
      id: "groc-drink-6",
      name: "Real Mixed Fruit Juice",
      weight: "1 L Tetra Pack",
      price: 115,
      mrp: 140,
      discount: "17% OFF",
      rating: "4.8",
      isVeg: true,
      image: img("photo-1600271886742-f049cd451bba"),
    },
    {
      id: "groc-drink-7",
      name: "Chilled Cold Coffee",
      weight: "200 ml",
      price: 45,
      mrp: 55,
      discount: "18% OFF",
      rating: "4.9",
      isVeg: true,
      image: coldCoffeeImg,
    },
    {
      id: "groc-drink-8",
      name: "Fresh Lime Sparkling Soda",
      weight: "300 ml",
      price: 30,
      mrp: 35,
      discount: "14% OFF",
      rating: "4.7",
      isVeg: true,
      image: freshLimeSodaImg,
    },
  ],

  "Sweet Cravings": [
    {
      id: "groc-sweet-1",
      name: "Cadbury Dairy Milk Silk",
      weight: "150 g",
      price: 165,
      mrp: 190,
      discount: "13% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1548907040-4baa42d10919"),
    },
    {
      id: "groc-sweet-2",
      name: "Ferrero Rocher Box",
      weight: "4 pcs (50 g)",
      price: 150,
      mrp: 175,
      discount: "14% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1549007994-cb92caebd54b"),
    },
    {
      id: "groc-sweet-3",
      name: "Rich Belgian Chocolate Brownie",
      weight: "2 pcs (120 g)",
      price: 110,
      mrp: 140,
      discount: "21% OFF",
      rating: "4.9",
      isVeg: true,
      image: chocolateBrownieImg,
    },
    {
      id: "groc-sweet-4",
      name: "Dutch Chocolate Truffle Pastry",
      weight: "1 pc",
      price: 85,
      mrp: 110,
      discount: "22% OFF",
      rating: "4.8",
      isVeg: true,
      image: img("photo-1578985545062-69928b1d9587"),
    },
    {
      id: "groc-sweet-5",
      name: "Amul Dark Chocolate 55%",
      weight: "150 g",
      price: 105,
      mrp: 125,
      discount: "16% OFF",
      rating: "4.8",
      isVeg: true,
      image: img("photo-1511381939415-e44015466834"),
    },
    {
      id: "groc-sweet-6",
      name: "Nutella Hazelnut Spread",
      weight: "350 g Jar",
      price: 340,
      mrp: 395,
      discount: "14% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1559598467-f8b76c8155d0"),
    },
    {
      id: "groc-sweet-7",
      name: "Royal Gulab Jamun Box",
      weight: "Pack of 4",
      price: 95,
      mrp: 120,
      discount: "20% OFF",
      rating: "4.8",
      isVeg: true,
      image: gulabJamunImg,
    },
    {
      id: "groc-sweet-8",
      name: "Classic Glazed Donuts",
      weight: "Pack of 2",
      price: 99,
      mrp: 130,
      discount: "23% OFF",
      rating: "4.7",
      isVeg: true,
      image: donutImg,
    },
  ],

  "Atta, Rice & Dals": [
    {
      id: "groc-staple-1",
      name: "Daawat Rozana Super Basmati",
      weight: "1 kg",
      price: 95,
      mrp: 130,
      discount: "27% OFF",
      rating: "4.9",
      isVeg: true,
      image: daawatBasmatiRiceImg,
    },
    {
      id: "groc-staple-2",
      name: "Aashirvaad Superior MP Atta",
      weight: "5 kg",
      price: 265,
      mrp: 310,
      discount: "14% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1574323347407-f5e1ad6d020b"),
    },
    {
      id: "groc-staple-3",
      name: "Tata Sampann Toor Dal",
      weight: "1 kg",
      price: 175,
      mrp: 210,
      discount: "16% OFF",
      rating: "4.8",
      isVeg: true,
      image: dalTadkaImg,
    },
    {
      id: "groc-staple-4",
      name: "Fortune Sunlite Refined Oil",
      weight: "1 L Pouch",
      price: 145,
      mrp: 175,
      discount: "17% OFF",
      rating: "4.8",
      isVeg: true,
      image: img("photo-1474979266404-7eaacbcd87c5"),
    },
    {
      id: "groc-staple-5",
      name: "Tata Salt Vacuum Evaporated",
      weight: "1 kg",
      price: 26,
      mrp: 28,
      discount: "7% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1585937421612-70a008356fbe"),
    },
    {
      id: "groc-staple-6",
      name: "Tata Sampann Moong Dal Split",
      weight: "500 g",
      price: 85,
      mrp: 105,
      discount: "19% OFF",
      rating: "4.8",
      isVeg: true,
      image: img("photo-1585937421612-70a008356fbe"),
    },
    {
      id: "groc-staple-7",
      name: "Pure Cow Ghee Jar",
      weight: "500 ml",
      price: 360,
      mrp: 420,
      discount: "14% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1631452180519-c014fe946bc7"),
    },
    {
      id: "groc-staple-8",
      name: "Premium Whole Cashews / Kaju",
      weight: "200 g",
      price: 195,
      mrp: 250,
      discount: "22% OFF",
      rating: "4.9",
      isVeg: true,
      image: img("photo-1616684000067-36952fde56ec"),
    },
  ],

  "Meat & Seafood": [
    {
      id: "groc-meat-1",
      name: "Fresh Tender Chicken Curry Cut",
      weight: "500 g",
      price: 155,
      mrp: 190,
      discount: "18% OFF",
      rating: "4.9",
      isVeg: false,
      image: chickenCurryImg,
    },
    {
      id: "groc-meat-2",
      name: "Boneless Chicken Breast Fillets",
      weight: "450 g",
      price: 185,
      mrp: 230,
      discount: "19% OFF",
      rating: "4.8",
      isVeg: false,
      image: chickenFryImg,
    },
    {
      id: "groc-meat-3",
      name: "Fresh Tender Mutton Curry Cut",
      weight: "500 g",
      price: 440,
      mrp: 520,
      discount: "15% OFF",
      rating: "4.9",
      isVeg: false,
      image: muttonCurryImg,
    },
    {
      id: "groc-meat-4",
      name: "Cleaned Fresh Medium Prawns",
      weight: "250 g",
      price: 210,
      mrp: 260,
      discount: "19% OFF",
      rating: "4.8",
      isVeg: false,
      image: prawnCurryImg,
    },
    {
      id: "groc-meat-5",
      name: "Fresh Rohu / Katla Fish Steaks",
      weight: "500 g",
      price: 175,
      mrp: 220,
      discount: "20% OFF",
      rating: "4.7",
      isVeg: false,
      image: fishCurryImg,
    },
    {
      id: "groc-meat-6",
      name: "Fresh Atlantic Salmon Steaks",
      weight: "250 g",
      price: 399,
      mrp: 480,
      discount: "17% OFF",
      rating: "4.9",
      isVeg: false,
      image: img("photo-1519708227418-c8fd9a32b7a2"),
    },
    {
      id: "groc-meat-7",
      name: "Crispy Seasoned Chicken Wings",
      weight: "6 pcs (350 g)",
      price: 160,
      mrp: 200,
      discount: "20% OFF",
      rating: "4.8",
      isVeg: false,
      image: chickenWingsImg,
    },
    {
      id: "groc-meat-8",
      name: "Fresh Cleaned Crab Meat",
      weight: "300 g",
      price: 280,
      mrp: 350,
      discount: "20% OFF",
      rating: "4.7",
      isVeg: false,
      image: crabCurryImg,
    },
  ],
};

// Aliases for matching old / url routes
const categoryAlias = {
  "Rice & Atta": "Atta, Rice & Dals",
  "Dairy & Eggs": "Dairy, Bread & Eggs",
  "Munchies": "Munchies & Snacks",
  "Sweet Tooth": "Sweet Cravings",
  "Oils & Ghee": "Atta, Rice & Dals",
  "Masalas & Nuts": "Atta, Rice & Dals",
  "Cold Drinks": "Cold Drinks & Juices",
};

const headerBgs = {
  "Fresh Vegetables": "linear-gradient(135deg, #107c41, #25a25a)",
  "Fresh Fruits": "linear-gradient(135deg, #d97706, #f59e0b)",
  "Dairy, Bread & Eggs": "linear-gradient(135deg, #1d4ed8, #3b82f6)",
  "Munchies & Snacks": "linear-gradient(135deg, #dc2626, #ef4444)",
  "Cold Drinks & Juices": "linear-gradient(135deg, #6d28d9, #8b5cf6)",
  "Sweet Cravings": "linear-gradient(135deg, #be185d, #ec4899)",
  "Atta, Rice & Dals": "linear-gradient(135deg, #b45309, #d97706)",
  "Meat & Seafood": "linear-gradient(135deg, #9f1239, #e11d48)",
};

const Grocery = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const rawCategory = categoryName ? decodeURIComponent(categoryName) : "Fresh Vegetables";
  const category = categoryAlias[rawCategory] || rawCategory;
  
  const { cartItems, addToCart, updateQty, removeFromCart } = useContext(CartContext);

  const items = groceryCatalog[category] || groceryCatalog["Fresh Vegetables"];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category]);

  const getItemQuantity = (productName) => {
    const item = cartItems.find((x) => x.name === productName);
    return item ? item.qty : 0;
  };

  const handleAdd = (item) => {
    addToCart({
      _id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      isVeg: item.isVeg,
      rating: item.rating,
      weight: item.weight,
    });
  };

  const handleIncrement = (item) => {
    const currentQty = getItemQuantity(item.name);
    if (currentQty === 0) {
      handleAdd(item);
    } else {
      updateQty(item.name, currentQty + 1);
    }
  };

  const handleDecrement = (item) => {
    const currentQty = getItemQuantity(item.name);
    if (currentQty === 1) {
      removeFromCart(item.name);
    } else if (currentQty > 1) {
      updateQty(item.name, currentQty - 1);
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="grocery-page-swiggy">
      {/* Top Breadcrumb & Swiggy Banner */}
      <div
        className="groc-hero-banner"
        style={{ background: headerBgs[category] || "linear-gradient(135deg, #0ca678, #20c997)" }}
      >
        <div className="container">
          <div className="groc-top-nav-row">
            <button onClick={handleBack} className="groc-back-btn" aria-label="Go back">
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            <div className="groc-breadcrumb">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <ChevronRight size={14} />
              <Link to="/" className="breadcrumb-link">Groceries</Link>
              <ChevronRight size={14} />
              <span className="breadcrumb-current">{category}</span>
            </div>
          </div>

          <div className="groc-banner-main">
            <div>
              <div className="instamart-badge-wrap">
                <span className="instamart-tag">INSTAMART</span>
                <span className="instamart-eta"><Zap size={14} /> 10-15 MINS DELIVERY</span>
              </div>
              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="groc-page-title"
              >
                {category}
              </motion.h1>
              <p className="groc-subtitle">
                {items.length} curated essentials • Farm fresh & directly sourced
              </p>
            </div>

            <div className="groc-highlights">
              <div className="highlight-pill">
                <Clock size={16} /> Instant Delivery
              </div>
              <div className="highlight-pill">
                <ShoppingBag size={16} /> Handpicked Quality
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container groc-body">
        {/* Category quick switcher horizontal pills */}
        <div className="groc-category-bar hide-scrollbar">
          {groceryCategoriesList.map((cat, idx) => {
            const isActive = cat.name.toLowerCase() === category.toLowerCase();
            return (
              <Link
                to={`/grocery/${encodeURIComponent(cat.name)}`}
                key={idx}
                className={`category-pill ${isActive ? "active" : ""}`}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-text">{cat.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Section Header */}
        <div className="groc-results-header">
          <div>
            <h2 className="section-heading">{category}</h2>
            <p className="section-subtext">Showing top {items.length} popular items in this category</p>
          </div>
        </div>

        {/* Swiggy Instamart Item Grid */}
        <div className="groc-items-grid">
          {items.map((item) => {
            const qty = getItemQuantity(item.name);
            return (
              <motion.div
                key={item.id}
                className="swiggy-groc-card"
                whileHover={{ translateY: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                {/* Top badges */}
                <div className="card-top-row">
                  <div className={`diet-indicator ${item.isVeg ? "veg" : "non-veg"}`}>
                    <div className="diet-dot"></div>
                  </div>
                  <span className="eta-badge">⚡ 10 mins</span>
                </div>

                {/* Product Image */}
                <div className="groc-card-img-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop";
                    }}
                  />
                  {item.discount && (
                    <span className="discount-pill">{item.discount}</span>
                  )}
                </div>

                {/* Product Details */}
                <div className="groc-item-body">
                  <div className="groc-weight-text">{item.weight}</div>
                  <h3 className="groc-item-name" title={item.name}>{item.name}</h3>

                  <div className="groc-rating-row">
                    <div className="star-rating">
                      <Star size={12} fill="#f59e0b" color="#f59e0b" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <div className="groc-bottom-action-row">
                    <div className="price-stack">
                      <span className="current-price">₹{item.price}</span>
                      {item.mrp && <span className="mrp-price">₹{item.mrp}</span>}
                    </div>

                    {qty === 0 ? (
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        className="swiggy-add-btn"
                        onClick={() => handleAdd(item)}
                      >
                        <Plus size={16} /> ADD
                      </motion.button>
                    ) : (
                      <div className="swiggy-qty-controls">
                        <button
                          className="qty-btn"
                          onClick={() => handleDecrement(item)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-count">{qty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => handleIncrement(item)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .grocery-page-swiggy {
          padding-top: 75px;
          min-height: 100vh;
          background: #f8f9fc;
          padding-bottom: 5rem;
        }
        .groc-hero-banner {
          padding: 3.5rem 1.5rem 3rem;
          color: white;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }
        .groc-top-nav-row {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .groc-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: white;
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .groc-back-btn:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateX(-3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .groc-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          opacity: 0.9;
        }
        .breadcrumb-link {
          color: white;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .breadcrumb-link:hover {
          opacity: 1;
          text-decoration: underline;
        }
        .breadcrumb-current {
          opacity: 1;
          font-weight: 700;
        }
        .groc-banner-main {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .instamart-badge-wrap {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
        }
        .instamart-tag {
          background: #ff5200;
          color: white;
          font-size: 0.72rem;
          font-weight: 900;
          padding: 3px 8px;
          border-radius: 6px;
          letter-spacing: 0.5px;
        }
        .instamart-eta {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(8px);
          font-size: 0.75rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
          border: 1px solid rgba(255,255,255,0.3);
        }
        .groc-page-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 900;
          letter-spacing: -1.5px;
          margin-bottom: 0.4rem;
          text-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }
        .groc-subtitle {
          font-size: 1.05rem;
          font-weight: 500;
          opacity: 0.95;
        }
        .groc-highlights {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .highlight-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,0.25);
        }
        .groc-body {
          margin-top: 1.8rem;
        }
        /* Category switcher horizontal bar */
        .groc-category-bar {
          display: flex;
          gap: 0.8rem;
          overflow-x: auto;
          padding: 0.5rem 0.2rem 1.5rem;
          margin-bottom: 1.5rem;
          scroll-snap-type: x mandatory;
        }
        .category-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 8px 18px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 30px;
          text-decoration: none;
          color: #334155;
          font-weight: 700;
          font-size: 0.9rem;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          transition: all 0.2s ease;
          scroll-snap-align: start;
        }
        .category-pill:hover {
          border-color: #cbd5e1;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.06);
        }
        .category-pill.active {
          background: #1a1a2e;
          color: white;
          border-color: #1a1a2e;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .category-pill.active .cat-icon {
          transform: scale(1.15);
        }
        .groc-results-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.8rem;
        }
        .section-heading {
          font-size: 1.6rem;
          font-weight: 900;
          color: #1a1a2e;
          letter-spacing: -0.5px;
        }
        .section-subtext {
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 500;
          margin-top: 2px;
        }
        /* Grid and Swiggy Cards */
        .groc-items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 1.5rem;
        }
        .swiggy-groc-card {
          background: white;
          border-radius: 18px;
          padding: 1rem;
          border: 1px solid #edf2f7;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .swiggy-groc-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
        }
        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .diet-indicator {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 2px solid #107c41;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
        }
        .diet-indicator.non-veg {
          border-color: #dc2626;
        }
        .diet-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #107c41;
        }
        .diet-indicator.non-veg .diet-dot {
          background: #dc2626;
        }
        .eta-badge {
          font-size: 0.7rem;
          font-weight: 800;
          color: #475569;
          background: #f1f5f9;
          padding: 2px 7px;
          border-radius: 6px;
        }
        .groc-card-img-wrap {
          width: 100%;
          height: 145px;
          border-radius: 14px;
          background: #f8fafc;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.8rem;
        }
        .groc-card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .swiggy-groc-card:hover .groc-card-img-wrap img {
          transform: scale(1.06);
        }
        .discount-pill {
          position: absolute;
          bottom: 6px;
          left: 6px;
          background: #2563eb;
          color: white;
          font-size: 0.65rem;
          font-weight: 900;
          padding: 2px 6px;
          border-radius: 5px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
        .groc-item-body {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .groc-weight-text {
          font-size: 0.78rem;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 0.2rem;
        }
        .groc-item-name {
          font-size: 0.98rem;
          font-weight: 800;
          color: #1e293b;
          line-height: 1.3;
          margin-bottom: 0.4rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 2.5em;
        }
        .groc-rating-row {
          margin-bottom: 0.8rem;
        }
        .star-rating {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 0.75rem;
          font-weight: 800;
          color: #b45309;
          background: #fef3c7;
          padding: 2px 6px;
          border-radius: 6px;
        }
        .groc-bottom-action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.4rem;
        }
        .price-stack {
          display: flex;
          align-items: baseline;
          gap: 5px;
        }
        .current-price {
          font-size: 1.15rem;
          font-weight: 900;
          color: #0f172a;
        }
        .mrp-price {
          font-size: 0.8rem;
          color: #94a3b8;
          text-decoration: line-through;
          font-weight: 600;
        }
        .swiggy-add-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          background: white;
          color: #107c41;
          border: 1.5px solid #107c41;
          font-weight: 900;
          font-size: 0.85rem;
          padding: 6px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(16,124,65,0.08);
        }
        .swiggy-add-btn:hover {
          background: #107c41;
          color: white;
          box-shadow: 0 4px 12px rgba(16,124,65,0.25);
        }
        .swiggy-qty-controls {
          display: flex;
          align-items: center;
          background: #107c41;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(16,124,65,0.2);
        }
        .qty-btn {
          background: none;
          border: none;
          color: white;
          padding: 6px 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s;
        }
        .qty-btn:hover {
          background: rgba(0,0,0,0.15);
        }
        .qty-count {
          color: white;
          font-weight: 900;
          font-size: 0.85rem;
          padding: 0 6px;
          min-width: 20px;
          text-align: center;
        }
        @media (max-width: 768px) {
          .groc-hero-banner { padding: 2.5rem 1rem 2rem; }
          .groc-items-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.9rem;
          }
          .swiggy-groc-card { padding: 0.75rem; }
          .groc-card-img-wrap { height: 120px; }
          .groc-item-name { font-size: 0.88rem; min-height: auto; }
          .current-price { font-size: 1rem; }
          .swiggy-add-btn { padding: 5px 10px; font-size: 0.78rem; }
        }
      `}} />
    </div>
  );
};

export default Grocery;
