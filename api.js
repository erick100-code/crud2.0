import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import produtos from "./produtos.js"

dotenv.config()

const app = express()
const PORT = 3000

app.use(express.json())// transforma toda requisição em json
// json = JAVASCRIPT OBJECT NOTATION

const connectmongo = async () => {
    try {
        await mongoose.connect(process.env.mongo_URL)   
        console.log('conexão com o mongoDB estabelecida')
    } catch (error) {
        console.log(`impossivel se connectar ao mongoDB, o seguinte erro foi detectado [${error}]`)
    }
}

connectmongo()

app.post("/produtos", async (req, res) => {
    try {
        const novoITEM = await produtos.create(req.body)
        res.json(novoITEM)
    } catch (error) {
        res.json({ error: error })
    }
})

app.get("/produtos", async (req, res) => {// await pausa a execução até que a promise seja resolvida
    try {
        const ler = await produtos.find()
        res.json(ler)
    } catch (error) {
        res.json({ error: error })
    }
})

app.put('/produtos/:id', async (req, res) => {
    try {
        const atualizar = await produtos.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(atualizar)
    } catch (error) {
        res.json({ error: error })
    }
})

app.delete("/produtos/:id", async (req, res) => {
    try {
        const deletar = await produtos.findByIdAndDelete(req.params.id)
        res.json(deletar)
    } catch (error) {
        res.json({ error: error })
    }
})

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`)
})