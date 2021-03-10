const express = require('express')
const uuid=require('uuid')
const members = require('../../Member')
const router = express.Router()

//get member details
router.get('/',(req,res)=>{
    res.json(members)
})

//get single member
router.get('/:id',(req,res)=>{
 const found = members.some(member=>member.id===parseInt(req.params.id))

  if(found){
  res.json(members.filter(member=>member.id===parseInt(req.params.id)))
 }
 else{
    res.status(400).json({msg:`member not found in this id of ${req.params.id}`})
 }
})
//create member

router.post('/',(req,res)=>{
    const newMember={
         id:uuid.v4(),
         //{"nme":"ajay","emil":"ajay@gmail.com"}
         name:req.body.nme,
         email:req.body.emil
    }
    if(newMember.name==null || newMember.email==null){
        return res.status(400).json({msg:`please give name and mail id`})
    }

    members.push(newMember)
    res.json(members)

})
//update member
router.put('/:id',(req,res)=>{
    const found = members.some(member=>member.id===parseInt(req.params.id))
   
     if(found){
       const updMember=req.body
       members.forEach(member=>{
           if(member.id===parseInt(req.params.id)){
               member.name=updMember.name?updMember.name:member.name
               member.email=updMember.email?updMember.email:member.email
           
               res.json({msg:'member updated',member})
           }
       })
    }
    else{
       res.status(400).json({msg:`member not found in this id of ${req.params.id}`})
    }
   })

//delete a member
router.delete('/:id',(req,res)=>{
    const found = members.some(member=>member.id===parseInt(req.params.id))
   
     if(found){
     res.json({msg:"member deleted",
     members:members.filter(member=>member.id!==parseInt(req.params.id))
    })
    }else{
       res.status(400).json({msg:`member not found in this id of ${req.params.id}`})
    }
   })

module.exports= router