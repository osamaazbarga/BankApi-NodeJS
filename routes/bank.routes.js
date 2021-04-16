const express=require('express');
const router=express.Router();
const fs=require('fs');
// const bankJSON=require('../bank.json');
const bankController=require('../controllers/bank.controller')

router.get('/',(req,res)=>{
    bankController.getUsers(req,res)
}).get('/:id',(req,res)=>{
    bankController.getUserById(req,res)
}).post('/',(req,res)=>{
    bankController.addUser(req,res)
}).put('/deposit/:id',(req,res)=>{
    bankController.putDeposit(req,res)
}).put('/withdraw/:id',(req,res)=>{
    bankController.putWithdraw(req,res)
}).put('/transfer/:id',(req,res)=>{
    bankController.putTransfer(req,res)
}).put('/credit/:id',(req,res)=>{
    bankController.putCredit(req,res)
}).put('/isactive/:id',(req,res)=>{
    bankController.putIsActive(req,res)
})

module.exports = router;