import express from "express";

const products = express.Router();

const productsData = [
  { id: 1, name: "Product A", price: 100 },
  { id: 2, name: "Product B", price: 150 },
  { id: 3, name: "Product C", price: 200 },
];

//Get all products
products.get('/',(req,res)=>{
    try{
        res.json(productsData);
    }catch(error){
        throw new Error("Error fetching products", error);
    }
    
})

//Get product by ID
products.get('/:id',(req,res)=>{
    try{
        const product = productsData.find(product => product.id === parseInt(req.params.id))
        if(!product) {
            return res.status(404).json({ message: `Product not found id ${req.params.id}` });
        }
        res.json(product);
    }catch(error){
        throw new Error("Error fetching product by ID", error);
    }
});

products.post('/',(req,res)=>{
    const newProduct = {
        id: productsData.length + 1,
        name: req.body.name,
        price: req.body.price
    };

    if(!newProduct.name || !newProduct.price) {
        return res.status(400).json({ message: "Name and price are required" });
    }

    productsData.push(newProduct);
    res.json(productsData);
}
);

export default products;