export default function Product({ product, addToCartHandler }) {
  const { productName, brand, category, isOrdered, price, rating } = product;
  // console.log(product);

  return (
    <div className="col-lg-6">
      <div className="card m1">
        <div className="card-body">
          <h5>
            <i className="fa fa-arrow-right"></i>
            {productName}
          </h5>
          <div>€ {price.toFixed(2)}</div>
          <div className="mt-2 text-muted">
            #{brand.brandName} #{category.categoryName}
          </div>
          <div>
            {[...Array(rating).keys()].map((el) => (
              <i className="fa fa-star text-warning" key={el}></i> // filled stars
            ))}
            {[...Array(5 - rating).keys()].map((el) => (
              <i className="fa fa-star-o text-warning" key={el}></i> // empty stars
            ))}
          </div>
          <div className="float-end">
            {isOrdered ? (
              <span className="text-primary">Added To Cart</span>
            ) : (
              <button className="btn btn-sm btn-primary" onClick={() => addToCartHandler(product)}>
                <i className="fa fa-cart-plus"></i> Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
