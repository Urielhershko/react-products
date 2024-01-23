function Product({ product, addToCart }) {
  debugger
  return (
    <>
      {/* <li>
        {product.name} - {product.price} - {product.category}
      </li> */}
      <div className="card" style={{ width: "20rem" }}>
        <img
          src={"https://picsum.photos/268/180?random=" + product.id}
          className="card-img-top"
          alt="..."
          height='150px'
          width='100px'
        />
        <div className="card-body">
          <h5 className="card-title">
            {product.name} - category:{product.category.name}
          </h5>
          <p className="card-text">{product.price}</p>
          {!localStorage.getItem('token') ? null : (<button className="btn btn-primary" onClick={() => addToCart(product.id)}>Add To Cart</button>)}

        </div>
      </div>
    </>
  );
}

export default Product;
