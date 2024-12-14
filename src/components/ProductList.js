import React, {Component} from 'react';
import PropTypes from 'prop-types';

//class component for productlist
class ProductList extends Component{
    render() {
        const{ products, onDelete } = this.props;
        return(
            <div className="product-list">
                <h2>Product List</h2>
                <ul>
                    {/* Looping through products and displaying each one*/}
                    {products.map((product) => (
                        <li key={product.name}>
                            {product.name} - ${product.price}
                            {/* Delete Button */}
                            <button
                                onClick={() => onDelete(product.name)} className="delete-button">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

//static prop validatio for class components
ProductList.propTypes = {
    products: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};


export default ProductList;