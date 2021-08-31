import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Counter from "../counter";
import { AiFillCloseCircle } from "react-icons/ai";
import BreadCrumb from "../breadcrumb";

const ShoppingCart = (props) => {
  const { cartList, onRemoveCartProduct, onChangeProductQuantity } = props;

  const [cart, setCart] = useState(null);

  useEffect(() => {
    setCart(cartList);
  }, []);

  return (
    <>
      <BreadCrumb />
      <section className="cart_wrapper">
        {cart?.length && (
          <div className="container mt-5">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr className="bg-grey">
                    <th scope="col">Product Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">SubTotal</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product, index, arr) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="table-product-view">
                            <img
                              src={product.product.images[0]}
                              alt="product name"
                            />
                          </div>
                        </td>
                        <td>
                          <span className="product_name">
                            {product.product.name}
                          </span>
                        </td>
                        <td>
                          <div>
                            <Counter
                              product={product}
                              cartItemId={product.product._id}
                              onChangeProductQuantity={onChangeProductQuantity}
                            />
                          </div>
                        </td>
                        <td>
                          <div>{product.product.price} $</div>
                        </td>
                        <td>
                          <span>
                            ${product.product.price * product.quantity}
                          </span>
                        </td>
                        <td>
                          <div
                            className="product-remove"
                            onClick={() =>
                              onRemoveCartProduct(product.product._id)
                            }
                          >
                            <AiFillCloseCircle />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-grey">
                  <tr>
                    <th colSpan="2">Total</th>
                    <th colSpan="2">
                      $
                      {cart.reduce((acc, cur) => {
                        return (acc += cur.quantity * cur.product.price);
                      }, 0)}
                    </th>
                    <th colSpan="2">
                      <Link className="btn btn-main btn-200" to="/checkout">
                        To Checkout
                      </Link>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ShoppingCart;
