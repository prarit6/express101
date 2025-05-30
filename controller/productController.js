const productsData = [
  { id: 1, name: "Product A", price: 100 },
  { id: 2, name: "Product B", price: 150 },
  { id: 3, name: "Product C", price: 200 },
];

function getAllProducts(req, res) {
  try {
    res.json(productsData);
  } catch (error) {
    throw new Error("Error fetching products", error);
  }
}

function getProductById(req, res) {
  const productsId = productsData.find(product => 
    product.id === parseInt(req.params.id));
  try {
    if (!productsId) {
      return res.status(400).json({
        status: "Error",
        code: "PRODUCT_NOT_FOUND",
        message: `Product id not found ${req.params.id}`,
      });
    }
    res.json(productsId);
  } catch (error) {
    throw new Error("Error fetching by id", error);
  }
}

function createProduct(req, res) {
  try {
    const newProduct = {
      id: productsData.length + 1,
      name: req.body.name,
      price: req.body.price,
    };

    if (!newProduct.name || !newProduct.price) {
      return res.status(400).json({
        status: "Error",
        code: "NAME_OR_PRICE_REQUIRED_FIELD",
        message: "Name or price of product required field",
      });
    }

    productsData.push(newProduct);
    res.json(productsData);
  } catch (error) {
    throw new Error("Error fetching by id", error);
  }
}

function updateProduct(req, res) {
  const products = productsData.find((product) => 
    product.id === parseInt(req.params.id));

  if (products) {
    const updateProduct = req.body;
    if (
      updateProduct.name === undefined &&
      updateProduct.price === undefined
    ) {
      return res.status(400).json({
        status: "Error",
        code: "PRODUCT_NOT_FOUND",
        message: `Product not found id ${req.params.id}`,
      });
    }

    products.name = updateProduct.name || products.name;
    products.price = updateProduct.price || products.price;
    return res.status(200).json({
      status: "Success",
      code: "PRODUCT_UPDATED",
      message: `Product with id ${req.params.id} updated successfully`,
      productUpdate: products,
    });
    
  } else {
    return res.status(404).json({
      status: "Error",
      code: "PRODUCT_NOT_FOUND",
      message: `Product not found id ${req.params.id}`,
    });
  }
}

function deleteProduct(req, res) {
  const productsIndex = productsData.find((product) => {
    product.id === parseInt(req.params.id);
  });

  if (productsIndex !== -1) {
    productsData.splice(productsIndex, 1);
    return res.status(200).json({
      status: "Success",
      code: "PRODUCT_DELETED",
      message: `Product with id ${req.params.id} deleted successfully`,
    });
  } else {
    return res.status(400).json({
      status: "Error",
      code: "PRODUCT_NOT_FOUND",
      message: `Product not found id ${req.params.id}`,
      product: productsData
    });
  }
}

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
