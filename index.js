let users = [
  {name: "joao", age:32, id:1},
  {name: "paulo", age:34, id:2},
  {name: "zé", age:12, id:3}
]
const uuid = require('uuid')

const express = require('express');

const app = express()
app.use(express.json())


const checkUserId = (request, response, next)=>{

    const { id } = request.params;

    const index = users.findIndex((item)=> item.id == id);

    if(index==-1){
      return response.status(404).json({message: "Usuario nao encontrado"})
    }

    request.userIndex = index
    request.userId = id
    next()

}



app.get("/users", (request, response)=>{

  return response.json(users)
})



app.post("/users", (request, response)=>{
const {name, age} = request.body;

const newUser = {name: name, age: age, id: uuid.v4() }

users.push(newUser)

return response.status(201).json(users)

})

app.put("/users/:id", checkUserId,(request, response)=>{
  const id = request.userId;
  const {name, age} = request.body;
  const index = request.userIndex


  const newUser = {name, age,id}

  users[index] = newUser

  if(index==-1){
    return response.status(404).json({message: "Usuario nao encontrado"})
  }else{
    return response.status(201).json(users[index])
  }
})


app.delete("/users/:id", checkUserId,(request, response)=>{

    const index = request.userIndex


    users.splice(index,1)
    return response.status(204).json(users[index])


})

app.listen(3000, ()=>{
  console.log("Server started on port 300")
} )
