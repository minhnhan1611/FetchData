import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeCart, updateQuantity, } from '../redux/CartReducer';

export default function CartModal(props) {

    const CartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const renderTotal = () => {
        if (CartItems) {
            const totalCart = CartItems.reduce((total, item) => {
                return total + item.price * item.quantity
            }, 0)
            return totalCart;
        }
    }

    const handleQuantityChange = (id, e) => {
        const newQuantity = parseInt(e.target.value);
        dispatch(updateQuantity({ id, quantity: newQuantity }))
    }

    return (
        <div>
            <div className="modal fade" id="cartModal" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog modalCart" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Cart</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {CartItems.map((product, index) => {
                                            return <tr key={index}>
                                                <td>{product.id}</td>
                                                <td>{product.title}</td>
                                                <td>
                                                    <img className='w-50 h-50' src={product.thumbnail} alt={product.id} />
                                                </td>
                                                <td className='d-flex justify-content-center'>
                                                    <button onClick={() => { dispatch(decrementQuantity(product.id)) }} className='btn btn-secondary mr-1'>-</button>
                                                    <input className='w-50 text-center' value={product.quantity} onChange={e => handleQuantityChange(product.id, e)} pattern="[0-9]*" />
                                                    <button onClick={() => { dispatch(incrementQuantity(product.id)) }} className='btn btn-secondary ml-1'>+</button>
                                                </td>
                                                <td>{(product.quantity * product.price).toLocaleString()}$</td>
                                                <td>
                                                    <button onClick={() => { dispatch(removeCart(product.id)) }} className='btn btn-danger'>Remove</button>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th className='text-right' colSpan={4}>Total: </th>
                                            <th className='total' colSpan={2}>{renderTotal().toLocaleString()}$</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-close" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
