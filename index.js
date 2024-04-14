const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

const combo = []

const checkUserId = (request, response, next) => {

    const { id } = request.params

    const index = combo.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    request.updateUser = index
    request.id = id

    next()
}

const showall = (request, response, next) => {

    
    console.log(`[${request.method}] - ${request.url}`)

    next()
    
}


app.get('/burges',showall, (request, response) => {

    return response.json(combo)

})

app.post('/burges',showall,showall, (request, response) => {

    const { pedido, clientName, price } = request.body

    const order = { id: uuid.v4(), pedido, clientName, price, status: "Em preparação" }

    combo.push(order)

    return response.status(201).json(order)
})

app.put('/burges/:id', checkUserId,showall, (request, response) => {

    const { pedido, clientName, price } = request.body
    const index = request.updateUser
    const id = request.id

    const updateUser = { id, pedido, clientName, price, status: "Em preparação" }

    combo[index] = updateUser

    return response.json(updateUser)

})

app.delete('/burges/:id', checkUserId,showall, (request, response) => {

    const id = request.id

    const index = request.updateUser

    combo.splice(index, 1)


    return response.status(204).json()

})


app.get('/burges/:id', checkUserId,showall, (request, response) => {

    const id = request.id

    const index = request.updateUser

    return response.json(combo[index])

})

app.patch('/burges/:id', checkUserId,showall, (request, response) => {

    request.id

    const index = request.updateUser

    combo[index].status = "Pronto"

    return response.json(combo[index])


})




app.listen(port, () => {
    console.log(`I'm on🚀!😬✌️ ${port}`)
})