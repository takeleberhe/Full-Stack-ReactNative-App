const express=require('express');
const {createCategory,getAllCategory,updateCategory,deleteCategory}=require('../Controller/category_controller');
const categoryRouter=express.Router();

              /*create Api Route*/
     categoryRouter.post('/category',createCategory);
     categoryRouter.get('/category',getAllCategory);
     categoryRouter.delete('/category/:id',deleteCategory);
     categoryRouter.patch('/category/:id',updateCategory);
     


     module.exports=categoryRouter;
    


