import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        prod_name : String,
        prod_price : Number,
        updated_at : {type: Date, default: Date.now}
    }
)

export default mongoose.model('Product', productSchema);