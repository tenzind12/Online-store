import { useState, useEffect } from 'react';
import { CategoriesService, BrandService, SortService } from './Service';

export default function ProductsList() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  const [sortBy, setSortBy] = useState('productName');
  const [sortOrder, setSortOrder] = useState('ASC');

  // USE EFFECT
  useEffect(() => {
    (async () => {
      // 1. fetch all brands to be used in get brand by id below =====
      const brandsResponse = await BrandService.fetchBrands();
      const allBrands = await brandsResponse.json();

      // 2. fetch all categories to be used in get category by id below =====
      const categoriesResponse = await CategoriesService.fetchCategories();
      const allCategories = await categoriesResponse.json();

      const productsResponse = await fetch(
        `http://localhost:5000/products?productName_like=${search}&_sort=productName&_order=ASC`,
        { method: 'GET' }
      );
      const productsResponseBody = await productsResponse.json();

      productsResponseBody.forEach((product) => {
        product.brand = BrandService.getBrandById(allBrands, product.brandId);
        product.category = CategoriesService.getCategoryById(allCategories, product.categoryId);
      });
      setProducts(productsResponseBody);
      setOriginalProducts(productsResponseBody);
    })();
  }, [search]);

  // click on column name handler
  const sortColumnNameHandler = (e, columnName) => {
    e.preventDefault();
    setSortBy(columnName);
    const negatedSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSortOrder(negatedSortOrder);
    setProducts(SortService.getSortedArray(originalProducts, columnName, negatedSortOrder));
  };

  // render column name
  const getColumnHeader = (columnName, displayName) => {
    return (
      <>
        <a href="/#" onClick={(e) => sortColumnNameHandler(e, columnName)}>
          {displayName}
        </a>{' '}
        {sortBy === columnName && sortOrder === 'ASC' && <i className="fa fa-sort-up"></i>}
        {sortBy === columnName && sortOrder === 'DESC' && <i className="fa fa-sort-down"></i>}
      </>
    );
  };

  return (
    <div className="row">
      {/* title and search box */}
      <div className="col-12">
        <div className="row p-3 header">
          <div className="col-lg-3">
            <h4>
              <i className="fa fa-suitcase"></i>
              &nbsp;Products&nbsp;
              <span className="badge bg-secondary">{products.length}</span>
            </h4>
          </div>

          <div className="col-lg-9">
            <input
              type="search"
              placeholder="Search"
              className="form-control"
              autoFocus="autofocus"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* products lists */}
      <div className="col-lg-10 mx-auto mb-2 ">
        <div className="card my-2 shadow">
          <table className="table">
            <thead>
              <tr>
                <th>{getColumnHeader('productName', 'Product Name')}</th>
                <th>{getColumnHeader('price', 'Price')}</th>
                <th>{getColumnHeader('brand', 'Brand')}</th>
                <th>{getColumnHeader('category', 'Category')}</th>
                <th>{getColumnHeader('rating', 'Rating')}</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.productName}</td>
                    <td>{product.price}</td>
                    <td>{product.brand.brandName}</td>
                    <td>{product.category.categoryName}</td>
                    <td>
                      {[...Array(product.rating).keys()].map((i) => (
                        <i className="fa fa-star text-warning" key={i}></i>
                      ))}
                      {[...Array(5 - product.rating).keys()].map((i) => (
                        <i className="fa fa-star-o text-warning" key={i}></i>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
