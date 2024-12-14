import React, { useState } from 'react';
import './App.css';
import Header from './components/header';
import ProductList from './components/ProductList';

// Defining the App component
function App() {
  // State to store the search term input
  const [searchTerm, setSearchTerm] = useState('');

  // State to store the selected category filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  // State to store the list of products
  const [products, setProducts] = useState([
    { name: 'Laptop', price: 999.99, category: 'Electronics' },
    { name: 'T-shirt', price: 19.99, category: 'Clothing' },
    { name: 'Harry Potter', price: 29.99, category: 'Books' },
    { name: 'Headphones', price: 199.99, category: 'Electronics' }
  ]);

  // State to store the input for adding a new product
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  /**
   * Filters the products based on:
   * 1. Selected category (if it's 'All', show all categories).
   * 2. The search term entered by the user (case-insensitive match).
   */
  const filteredProducts = products.filter((product) =>
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  //Handles the form submission to add a new product.
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      setProducts([
        ...products,
        { name: newProduct.name, price: parseFloat(newProduct.price), category: 'Uncategorized' }
      ]);
      setNewProduct({ name: '', price: '' }); // Clear the form inputs
    } else {
      alert('Please provide a valid product name and price.');
    }
  };

  
  //Handles deleting a product by filtering it out of the products list.
  const handleDeleteProduct = (productName) => {
    setProducts(products.filter((product) => product.name !== productName));
  };

  return (
    <div className="App">
      {/* Header Component */}
      <header className="App-header">
        <Header />
      </header>

      <main>
        {/* Filter Products by Category */}
        <div className="filter-container">
          <label>Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)} // Corrected function name
          >
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Product List or No Results Message */}
        {filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} onDelete={handleDeleteProduct} />
        ) : (
          <p className="no-results">No products found.</p>
        )}

        {/* Add New Product Form */}
        <div className="add-product-form">
          <h2>Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            {/* Product Name Input */}
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            {/* Product Price Input */}
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            {/* Submit Button */}
            <button type="submit">Add Product</button>
          </form>
        </div>
      </main>
    </div>
  );
}

// Exporting the App component
export default App;
