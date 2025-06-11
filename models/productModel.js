import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        prod_name : {type : String, require: true, maxlength: 20},
        prod_price : {type : Number, require: true, default: 0, minlength: 0},
        image_url: {type: String, require:true, default: "https://cdn.prod.website-files.com/64022de562115a8189fe542a/6616718fe4a871d7278a2037_Product-Concept-What-Is-It-And-How-Can-You-Best-Use-It.jpg"},
        updated_at : {type: Date, default: Date.now}
    }
)

export default mongoose.model('Product', productSchema);