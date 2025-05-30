import productModel from "../models/productModel.js";

async function getAllProducts(req, res) {
  try {
    const getProducts = await productModel.find()
    res.status(201).json({
      status: "Success",
      code: "GET_ALL_PRODUCT",
      data: getProducts})
  } catch (err) {
    res.status(404).json(
      {
        status: "Error",
        code: "PRODUCT NOT FOUND",
        message: "Product not found",
      }
    )
    throw new Error("Error fetching products", err);
  }
}

async function getProductById(req, res) {
  try {
    const product = await productModel.findById(req.params.id);
    if (product) {
      return res.status(200).json({
        status: "Success",
        code: "GET_PRODUCT_BY_ID",
        message: `Get product ${req.params.id}`,
        product: product
      });
    } else {
      return res.status(404).json({
        status: "Error",
        code: "PRODUCT_NOT_FOUND_ID",
        message: "Product id not found"
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Error",
      code: "SERVER_ERROR",
      message: "Error fetching product"
    });
    throw new Error("Error fetching product", err);
  }
}

async function createProduct(req, res) {
  try {
    const createProduct = await productModel.create(req.body)
    res.status(201).json({
      status:"Success",
      code: "PRODUCT_CREATED",
      message: "Product created successfully",
      product: createProduct
    })
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(400).json({
      status: "Error",
      code: "PRODUCT_NOT_CREATED",
      message: "Product not created",
    }); 
  }
}

async function updateProduct(req, res) {
  try{
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if(product){
      return res.status(201).json({
        status: "Success",
        code: "PRODUCT_UPDATED",
        message: "Product is updated!",
        data: product
      })
    } else{
      return res.status(404).json({
        status:  "Error",
        code: "PRODUCT_FAILED_TO_UPDATE",
        message: ""
      })
    }
  } catch(err){
     console.error("Error updated product:", err);
    res.status(400).json({
      status: "Error",
      code: "PRODUCT_NOT_UPDATED",
      message: "Product not updated",
    });
  }
}

async function deleteProduct(req, res) {
  try{
    const deleteProduct = await productModel.findByIdAndDelete(req.params.id)
    if(deleteProduct){
      return res.status(200).json({
        status: "Success",
        code: "DELETED_PRODUCT_SUCCESS",
        message: `Product ${req.params.id} deleted`
      })
    }else{
      return res.status(404).json({
        status: "Error",
        code: "UNABLE_TO_DELETE_PRODUCT",
        message: `Unable to delete product ${req.params.id}`
      })
    }
  }catch (err){
    console.error("Error to deleted product:", err)
  }
}

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
