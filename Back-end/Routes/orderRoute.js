const express=require("express");
const {addOrder,getAllOrders,getById,updateOrder,deleteOrder,
       getTotalSales,getOrdercount, userOrders,}=require('../Controller/order_controller');
const {verifyToken,isAdmin,isAuth}=require('../Middlewares/authMiddleware');      
const {uploadImage}    =require('../Middlewares/imageUploadMdw')  
const ordRouter=express.Router();
                 /**/
ordRouter.post('/orders',uploadImage.single('image'),addOrder);      
ordRouter.get('/orders',verifyToken,isAdmin,getAllOrders);
ordRouter.get('/orders/:id',getById);
               /* */
ordRouter.patch('/orders/:id',verifyToken,updateOrder);
ordRouter.delete('/orders/:id',verifyToken,deleteOrder);
ordRouter.get('/orders/get/totalsales',verifyToken,getTotalSales);
ordRouter.get('/orders/get/ordercount',getOrdercount);
ordRouter.get('/orders/get/userorder/:id',userOrders);

module.exports=ordRouter;
