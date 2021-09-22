import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Divider } from 'rsuite';
import ProductItems from '../Database/products.json';
import categories from '../Database/categories.json';
import Product from '../Components/Product';
import Navbar from '../Components/Navigation/Navbar';
import FilterNav from '../Components/Navigation/FilterNav';
import { useFilter } from '../misc/custom-hooks';

function getFilteredItems(products, filter) {
  let result = [...products];

  if (filter.inStock) result = result.filter(p => p.inStock === true);

  if (filter.delivery) result = result.filter(p => p.delivery === true);

  if (filter.expensive) result = result.filter(p => p.price > 100);

  return result;
}

const findProductsOfCategoryId = id =>
  ProductItems.filter(p => p.categoryId === id);

const Categories = () => {
  const { id } = useParams();

  const category = categories.find(c => c.id === id);
  const categoryProducts = findProductsOfCategoryId(id);
  const [products, setProducts] = useState(categoryProducts);

  useEffect(() => {
    if (category.id) setProducts(findProductsOfCategoryId(category.id));
  }, [category]);

  const [filter, dispatchFilter] = useFilter({
    inStock: false,
    delivery: false,
    expensive: false,
  });

  const filteredProducts = getFilteredItems(products, filter);

  const onFilterChange = useCallback(
    ev => {
      const checkbox = ev.target;

      dispatchFilter({
        type: 'SET',
        filterName: checkbox.name,
        value: checkbox.checked,
      });
    },
    [dispatchFilter]
  );

  if (!category) {
    return <div>Category with id {id} does not exist</div>;
  }

  return (
    <>
      <Navbar />
      <div className="filter-nav">
        <span className=" ml-3 mt-2 font-bolder ">
          <u>FILTER</u>:
        </span>
        <div className="ml-3 mt-2 d-inline-flex">
          <FilterNav
            id="inStock"
            name="inStock"
            checked={filter.inStock}
            onChange={onFilterChange}
            label="In Stock"
          />
          <FilterNav
            id="delivery"
            name="delivery"
            checked={filter.delivery}
            onChange={onFilterChange}
            label="Delivery"
          />
          <FilterNav
            id="expensive"
            name="expensive"
            checked={filter.expensive}
            onChange={onFilterChange}
            label="Expensive"
          />
        </div>
      </div>
      <Divider />
      <h2 className="ml-3">{category.name}</h2>
      <div className="ml-3">
        Showing Results {filteredProducts.length} of {products.length}
      </div>
      <Product products={filteredProducts} />;
    </>
  );
};

export default Categories;
