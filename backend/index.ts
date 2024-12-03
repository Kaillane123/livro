import express from "express"
import bcrypt from "bcrypt"
import session from "express-session"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

dotenv.config()

const app = express()
app.use(express.json())
app.use(session({
    secret: process.env.SECRET!
}))

app.get("/", (req, res) => {
    res.json({ message: "Teste" })
})

app.post("/login", async (req, res) => {
    const { email, senha } = req.body

    const usuario = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (!usuario) {
        res.status(400).json({ message: "Usuário não encontrado" })
        return
    }

    if (await bcrypt.compare(senha, usuario.senha)) {
        // @ts-ignore
        req.session.userEmail = email
    } else {
        res.status(401).json({ message: "Senha incorreta" })
        return
    }

    res.json({ message: "Login feito com sucesso" })
})

app.listen(8000, () => {
    console.log("Servidor rodando em http://localhost:8000")
})
