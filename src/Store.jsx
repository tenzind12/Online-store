import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { BrandService, CategoriesService, ProductService } from './Service';

export default function Store() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const userContext = useContext(UserContext);

  useEffect(() => {
    (async () => {
      // 1. FETCH ALL BRANDS
      const brandsResponse = await BrandService.fetchBrands();
      const brandsResponseBody = await brandsResponse.json();
      if (brandsResponseBody) {
        brandsResponseBody.forEach((brand) => {
          brand.isChecked = true;
        });
      }
      setBrands(brandsResponseBody);

      // 2. FETCH ALL CATEGORIES
      const categoriesResponse = await CategoriesService.fetchCategories();
      const categoriesResponseBody = await categoriesResponse.json();
      if (categoriesResponseBody) {
        categoriesResponseBody.forEach((category) => (category.isChecked = true));
      }
      setCategories(categoriesResponseBody);

      // 3. FETCH ALL PRODUCTS
      const productResponse = await ProductService.fetchProducts();
      const productResponseBody = await productResponse.json();
      if (productResponse.ok) {
        productResponseBody.forEach((product) => {
          product.isOrdered = false;
          product.brand = BrandService.getBrandById(brands, product.brandId);
          product.category = CategoriesService.getCategoryById(categories, product.categoryId);
        });
      }
      console.log(productResponseBody);
    })();
  }, []);

  // brands check uncheck
  const updateBrandIsChecked = (id) => {
    const brandData = brands.map((brand) => {
      if (brand.id === id) brand.isChecked = !brand.isChecked;
      return brand;
    });
    setBrands(brandData);
  };

  // categories check uncheck
  const updateCategoryIsChecked = (id) => {
    const categoryData = categories.map((category) => {
      if (category.id === id) category.isChecked = !category.isChecked;
      return category;
    });
    setCategories(categoryData);
  };

  return (
    <>
      <div className="row py-3 header">
        <div className="col-lg-3">
          <h4>
            <i className="fa fa-shopping-bag"></i>Store
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 py-2">
          <div className="my-2">
            <h5>Brands</h5>
            <ul className="list-group list-group-flush">
              {brands.map((brand) => {
                return (
                  <li className="list-group-item" key={brand.id}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        value="true"
                        id={`brand${brand.id}`}
                        checked={brand.isChecked}
                        onChange={() => {
                          updateBrandIsChecked(brand.id);
                        }}
                      />
                      <label className="form-check-label" htmlFor={`brand${brand.id}`}>
                        {brand.brandName}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="my-2">
            <h5>Categories</h5>
            <ul className="list-group list-group-flush">
              {categories.map((category) => {
                return (
                  <li className="list-group-item" key={category.id}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        value="true"
                        id={`category${category.id}`}
                        checked={category.isChecked}
                        onChange={() => {
                          updateCategoryIsChecked(category.id);
                        }}
                      />
                      <label className="form-check-label" htmlFor={`category${category.id}`}>
                        {category.categoryName}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-lg-9">
          <>
            {JSON.stringify(brands)}
            {JSON.stringify(categories)}
            {JSON.stringify(products)}
          </>
        </div>
      </div>
    </>
  );
}
