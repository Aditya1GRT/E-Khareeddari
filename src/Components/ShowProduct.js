import React, { useCallback } from 'react';
import { Button, Icon, Modal } from 'rsuite';
import { useCartDispatch } from '../misc/cart.context';
import { useModalState } from '../misc/custom-hooks';
import { StyledShowProduct } from './ShowProduct.styled';

const ShowProduct = ({
  id,
  name,
  image,
  price,
  currency,
  delivery,
  inStock,
}) => {
  const { isOpen, open, close } = useModalState();
  const dispatchCart = useCartDispatch();

  const addToCart = useCallback(
    (productInStock, pid, productPrice) => {
      if (!productInStock) return;

      dispatchCart({ type: 'ADD_ONE', id: pid, price: productPrice });
      close();
    },
    [dispatchCart, close]
  );

  return (
    <StyledShowProduct>
      <div className="img-wrapper">
        <img src={image} alt={name} />
      </div>

      <h1>{name}</h1>
      {inStock ? (
        <>
          <h4>
            <u>Price</u>: {price} {currency}
          </h4>
          <h4>
            <u>Delivery</u>:{' '}
            {delivery ? <span>Available</span> : <span>Unavailable</span>}
          </h4>

          <div className="btns d-inline-flex">
            <Button
              style={{
                padding: '5px 10px',
              }}
              onClick={open}
              className="mr-3"
            >
              View <Icon style={{ marginLeft: '5px' }} icon="eye" />
            </Button>
            <Button
              onClick={() => addToCart(inStock, id, price)}
              style={{
                padding: '5px 10px',
              }}
              type="button"
            >
              Add <Icon style={{ marginLeft: '5px' }} icon="cart-plus" />
            </Button>
          </div>
        </>
      ) : (
        <>
          <h4 className="text-red">Out Of Stock</h4>
          <div className="btns d-inline-flex">
            <Button
              style={{
                padding: '5px 10px',
              }}
              onClick={open}
              className="mr-3 mt-3"
            >
              View <Icon style={{ marginLeft: '5px' }} icon="eye" />
            </Button>
          </div>
        </>
      )}
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex">
          <img src={image} alt={name} style={{ width: '60%', height: '50%' }} />
          <span className="ml-1 font-bolder ">
            <p>
              Price: {price} {currency}
            </p>
            {inStock ? (
              <>
                <p>
                  Delivery:{' '}
                  {delivery ? (
                    <span className="text-green">Available</span>
                  ) : (
                    <span className="text-red">Unavailable</span>
                  )}
                </p>
              </>
            ) : (
              <span className="text-red mt-3">Currently Out Of Stock</span>
            )}
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => addToCart(inStock, id, price)}
            disabled={!inStock}
            color="green"
          >
            Add to Cart
          </Button>

          <Button onClick={close} color="cyan">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </StyledShowProduct>
  );
};

export default ShowProduct;
