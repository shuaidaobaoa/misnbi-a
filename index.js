const express = require('express')
const app = express()
app.use(express.json())
const notes = [
    { id: 1, name: '宋狗', sex: 1 },
    { id: 2, name: '陈狗', sex: 2 }
]
const users = [
    { id: 1, name: '宋狗', sex: 1 },
    { id: 222, name: '陈狗', sex: 2 },
    { id: 12, name: '啊狗', sex: 1 },
    { id: 13, name: '怕狗', sex: 1 },
    { id: 14, name: '来狗', sex: 1 },
    { id: 15, name: '看狗', sex: 1 },

]



app.get('/users', (req, res) => {
    const page = +req.query.page || 1
    const perpage = +req.query.perpage || 10
    const q = req.query.q || ''

    const result = users
        .filter(user => user.name.includes(q))
        .slice(perpage * (page - 1), perpage * page)
    res.json(result)
})

app.get('/users/:id', (req, res) => {
    const id = +req.params.id
    const user = users.find(u => u.id === id)
    res.json(user)
})

app.put('/users/:id', (req, res) => {
    const id = +req.params.id
    const index = users.findIndex(u => u.id === id)
    users[index] = {
        ...req.body,
        id,
    }
    res.json(users[index])
})


app.delete('/users/:id', (req, res) => {
    const id = +req.params.id
    const index = users.findIndex(u => u.id === id)
    users.splice(index, 1)
    res.json()
})


app.post('/users', (req, res) => {
    const user = {
        ...req.body,
        id: Math.max(...users.map(u => u.id)) + 1
    }
    users.push(user)
    res.json(user)
})


app.get('/notes', (req, res) => {
    res.json(notes)
})


app.listen(5001)