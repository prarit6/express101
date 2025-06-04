import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        prod_name : {type : String, require: true, maxlength: 20},
        prod_price : {type : Number, require: false, default: 0, minlength: 0},
        updated_at : {type: Date, default: Date.now}
    }
)

export default mongoose.model('Product', productSchema);