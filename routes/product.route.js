const express=require("express")

const ProductModel=require("../models/product.model")

const router=express.Router()


    
   router.get("/",async(req,res)=>{
    
    try{
      const product= await ProductModel.find()
      res.send({result:product.length,product})
    }catch(err){
      res.send({"eroor":err.message})
    }
   })
   router.get("/singleproduct/:id",async(req,res)=>{
    const id=req.params.id
    
    try{
      const product= await ProductModel.findOne({"_id":id})
      res.send({product})
    }catch(err){
      res.send({"eroor":err.message})
    }
   })
    
    
    
    router.post("/add", async (req, res) => {
      try {
        const ProductData = await ProductModel.insertMany(req.body);
      
        res.send({ message: "Product has been added successfully" });
      } catch (error) {
        res.send({ message: "Cannot add product", error: error.message });
      }
    });
    
    router.patch("/update/:id", async (req, res) => {
      const id = req.params.id;
      try {
        await ProductModel.findByIdAndUpdate({ _id: id }, req.body);
        res.send({ message: "Product has been updated successfully" });
      } catch (error) {
        res.send({
          message: "Cannot update the product",
          error: error.message,
        });
      }
    });
    
    router.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      try {
        await ProductModel.findByIdAndDelete({ _id: id });
        res.send({ message: "Product has been deleted successfully" });
      } catch (error) {
        res.send({
          message: "Cannot delete the product",
          error: error.message,
        });
      }
    });
    
    module.exports = router
    
    