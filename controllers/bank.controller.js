const bankJSON=require('../bank.json');
const fs=require('fs');
const getUsers=(req,res)=>{
    return res.status(200).json({users:bankJSON})
}

const getUserById=(req,res)=>{
    const duplicateuser=bankJSON.find((user)=>user.id==req.params.id)
    if(duplicateuser.isActive==false){
        return res.status(200).json({error:"the worker is not active"})
    }else if(duplicateuser){
        return res.status(200).json({user:duplicateuser})
    }else{
        return res.status(200).json({error:"worker is undinded"})
    }
}

const addUser=(req,res)=>{
    const {id} = req.body;
    const duplicateuser=bankJSON.find((user)=>user.id==id)
    if(duplicateuser){
        return res.status(200).json({error: "the exist in db"})
    }else if(!id){
        return res.status(200).json({error: "enter id"})
    }else{
        const users=bankJSON
        const obj={
            id:id,
            cash:0,
            credit:0,
            isActive:true
        }

        users.push(obj)
        users.sort((a,b)=>{
            return a.id-b.id
        })
        const dataJSON=JSON.stringify(users)
        fs.writeFileSync('bank.json',dataJSON)
        res.send(obj)

    }
}

const putDeposit=()=>{
    const {id} = req.params;
    const {deposit} = req.body;
    const duplicateuser=bankJSON.find((user)=>user.id==id)
    if(duplicateuser==undefined){
        res.status(200).send({error:"the user is undfinded"})
    }else if(duplicateuser.isActive==false){
        res.status(200).send({error:"the user is not active any more"})
    }else if(deposit<=0){
        res.status(200).send({error:"the index is uncorrent"})
    }else if(!deposit){
        res.status(200).send({error:"please enter an amount of money"})
    }else {
        const users=bankJSON
        duplicateuser.cash+=deposit;
        const dataJSON=JSON.stringify(users)
        fs.writeFileSync('bank.json',dataJSON)
        res.status(200).send({success:"the deposting is already success,you cash now is: "+duplicateuser.cash})
    }
}

const putWithdraw=(req,res)=>{
    const {id} = req.params;
    const {withdraw} = req.body;
    const duplicateuser=bankJSON.find((user)=>user.id==id)
    if(duplicateuser==undefined){
        res.status(200).send({error:"the user is undfinded"})
    }else if(duplicateuser.isActive==false){
        res.status(200).send({error:"the user is not active any more"})
    }else if(withdraw<=0){
        res.status(200).send({error:"the index is uncorrent"})
    }else if(!withdraw){
        res.status(200).send({error:"please enter an amount of money"})
    }else if(duplicateuser.credit*(-1)>=duplicateuser.cash-withdraw){
        res.status(200).send({error:"no money to withdrow , the maximum withdrow is "+(duplicateuser.credit+duplicateuser.cash)})
    }
    else {
        const users=bankJSON
        duplicateuser.cash-=withdraw;
        const dataJSON=JSON.stringify(users)
        fs.writeFileSync('bank.json',dataJSON)
        res.status(200).send({success:"the withdraw is already success, you cash now is: "+duplicateuser.cash})
    }

}

const putTransfer=(req,res)=>{
    const {id} = req.params;
    const {cash,to} = req.body;
    const duplicateuser1=bankJSON.find((user)=>user.id==id)
    const duplicateuser2=bankJSON.find((user)=>user.id==to)
    if(duplicateuser1==undefined){
        res.status(200).send({error:"the user is undfinded"})
    }else if(duplicateuser2==undefined){
        res.status(200).send({error:"the user that you need to send for him is undefinded"})
    }else if(duplicateuser1.isActive==false){
        res.status(200).send({error:"the user is not active any more"})
    }else if(duplicateuser2.isActive==false){
        res.status(200).send({error:"the user that you need to send for him is not active any more"})
    }else if(cash<=0){
        res.status(200).send({error:"the index is uncorrent"})
    }else if(!cash){
        res.status(200).send({error:"please enter an amount of money"})
    }else if(duplicateuser1.credit*(-1)>duplicateuser1.cash-cash){
        res.status(200).send({error:"no money to withdrow , the maximum withdrow is "+(duplicateuser1.credit+duplicateuser1.cash)})
    }else {
        const users=bankJSON
        duplicateuser1.cash-=cash;
        duplicateuser2.cash+=cash;
        const dataJSON=JSON.stringify(users)
        fs.writeFileSync('bank.json',dataJSON)
        res.status(200).send({success:"the Transferring is already success, you cash now is: "+duplicateuser1.cash})
    }
}

const putCredit=(req,res)=>{
    const {id} = req.params;
    const {credit} = req.body;
    const duplicateuser=bankJSON.find((user)=>user.id==id)
    if(duplicateuser==undefined){
        res.status(200).send({error:"the user is undfinded"})
    }else if(duplicateuser.isActive==false){
        res.status(200).send({error:"the user is not active any more"})
    }else if(credit<=0){
        res.status(200).send({error:"the index is uncorrent"})
    }else if(!credit){
        res.status(200).send({error:"please enter a credit"})
    }else {
        const users=bankJSON
        duplicateuser.credit+=credit
        const dataJSON=JSON.stringify(users)
        fs.writeFileSync('bank.json',dataJSON)
        res.status(200).send({error:"ok"})
    }

}

const putIsActive=(req,res)=>{
    const {id} = req.params;
    console.log(id)
    const duplicateuser=bankJSON.find((user)=>user.id==id)
    if(duplicateuser==undefined){
        res.status(200).send({error:"the user is undfinded"})
    }else{
        const users=bankJSON
        duplicateuser.isActive=!duplicateuser.isActive
        const dataJSON=JSON.stringify(users)
        fs.writeFileSync('bank.json',dataJSON)
        if(duplicateuser.isActive==true){
            res.status(200).send({error:"the account is active now"})
        }
        res.status(200).send({error:"the account is unactive any more"})



    }
}

module.exports={
    getUsers,
    getUserById,
    addUser,
    putDeposit,
    putWithdraw,
    putTransfer,
    putCredit,
    putIsActive,
}