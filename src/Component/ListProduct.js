import React, { useEffect, useState } from 'react';
import CartModal from './CartModal';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

export default function ListProduct() {
    const [product, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const getProductData = async () => {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProduct(data.products);
    };

    useEffect(() => {
        getProductData();
    }, []);

    const renderProduct = () => {
        if (product.length > 0) {
            return product.map((product, index) => {
                return (
                    <div className="col-6 col-md-4 col-lg-3" key={index}>
                        <div className="card text-left text-white bg-secondary mt-5">
                            <img className="card-img-top" src={product.thumbnail} alt={product.id} />
                            <div className="card-body">
                                <h4 className="card-title">{product.title}</h4>
                                <p className="card-text font-weight-bold">{product.price}$</p>
                                <p className="card-text hidden-text">{product.description}</p>
                            </div>
                            <div className='button-margin d-flex justify-content-between m-2'>
                                <button className='btn btn-primary' data-toggle="modal" data-target="#modelId" onClick={() => setSelectedProduct(product)}>Detail</button>
                                <button onClick={() => { handleAddToCart(product) }} className='btn btn-success'>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    };

    const handleAddToCart = (product) => {
        const { id, title, thumbnail, price } = product;
        const newProduct = {
            id,
            title,
            thumbnail,
            quantity: 1,
            price
        }
        dispatch(addToCart(newProduct))
    }

    const renderQuantity = () => {
        if (cartItems) {
            const totalQuantity = cartItems.reduce((total, item) => {
                return total + item.quantity;
            }, 0);
            return totalQuantity;
        }
        return 0;
    }

    return (
        <div className='container'>
            <h3 className='mt-5'>Danh Sách Sản Phẩm</h3>
            <div className='text-right'>
                <span className='cart-modal' data-toggle="modal" data-target="#cartModal">
                    <i className="bx bx-cart bx-xs mr-5">(<i className='text-danger'>{renderQuantity()}</i>)Cart</i>
                </span>
            </div>
            <div className='row'>
                {renderProduct()}
                <CartModal />
            </div>
            {selectedProduct && (
                <div className="modal fade show" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Product Details</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Price</th>
                                                <th>Discount Percentage</th>
                                                <th>Rating</th>
                                                <th>Stock</th>
                                                <th>Brand</th>
                                                <th>Category</th>
                                                <th>Thumbnail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{selectedProduct.id}</td>
                                                <td>{selectedProduct.title}</td>
                                                <td>{selectedProduct.description}</td>
                                                <td>{selectedProduct.price}</td>
                                                <td>{selectedProduct.discountPercentage}</td>
                                                <td>{selectedProduct.rating}</td>
                                                <td>{selectedProduct.stock}</td>
                                                <td>{selectedProduct.brand}</td>
                                                <td>{selectedProduct.category}</td>
                                                <td><img src={selectedProduct.thumbnail} alt={selectedProduct.id} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



