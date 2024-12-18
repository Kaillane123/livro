import express from "express"
import bcrypt from "bcrypt"
import session from "express-session"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import { books } from "@googleapis/books"

const booksApi = books("v1")

declare module 'express-session' {
    interface SessionData {
      userId: number | null;
    }
}

const prisma = new PrismaClient()

dotenv.config()  // Carrega as variáveis de ambiente do arquivo

const app = express()
app.use(express.json())
app.use(session({
    secret: process.env.SECRET!
}))


// Rota POST para login de usuário
app.post("/login", async (req, res) => {
    const { email, senha } = req.body

    const usuario = await prisma.user.findFirst({
        where: {
            email: email.trim().toLowerCase()// Normaliza o email para comparar
        }
    })

    if (!usuario) {
        res.status(400).json({ message: "Usuário não encontrado" })
        return
    }
    // Compara a senha fornecida com a senha armazenada
    if (await bcrypt.compare(senha, usuario.senha)) {
        req.session.userId = usuario.id
    } else {
        res.status(401).json({ message: "Senha incorreta" })
        return
    }

    res.json({ message: "Login feito com sucesso" })
})
//cria o novo usuário no banco de dados
app.post("/cadastro", async (req, res) => {
    const { email, senha } = req.body

    const usuario = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (usuario) {
        res.status(401).json({ message: "Usuário já existe" })
    }

    await prisma.user.create({
        data: {
            email: email.trim().toLowerCase(),
            senha: await bcrypt.hash(senha, 12)
        }
    })

    res.json({ message: "Usuário cadastrado com sucesso" })
})

app.get("/comentarios/:livroCod", async (req, res) => {
    const comentarios = await prisma.comentarios.findMany({
        where: {
            livroCod: req.params.livroCod!
        }
    })

   res.json(comentarios)// Retorna os comentários encontrados no banco de dados
})

app.post("/comentarios", async (req, res) => {
    const { text, livroCod } = req.body;

    let livro = await prisma.livro.findUnique({
        where: {
            cod: livroCod
        }
    })

    if (!livro) {
        const book = await booksApi.volumes.get({ volumeId: livroCod })
        if (
            book.data
            && book.data.volumeInfo
            && book.data.volumeInfo.title
            && book.data.volumeInfo.authors
            && book.data.volumeInfo.categories
            && book.data.volumeInfo.imageLinks
            && book.data.volumeInfo.imageLinks.thumbnail
        ) {
            livro = await prisma.livro.create({
                data: {
                    cod: livroCod,
                    nome: book.data.volumeInfo.title,
                    autor: book.data.volumeInfo.authors.join(", "),
                    genero: book.data.volumeInfo.categories.join(", "),
                    poste: book.data.volumeInfo.imageLinks.thumbnail
                }
            })
        } else {
             res.status(400).json({ error: 'Livro não encontrado' })
        }
    }
     // Tenta criar o comentário no banco de dados
    try {
      const newComment = await prisma.comentarios.create({
        data: {
          text,
          livroCod,
          userId: req.session.userId!// associar o comentário ao usuario
        },
      });
  
      res.status(201).json(newComment); // Retorna o comentário recém-criado
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao adicionar comentário' });
    }
})

app.listen(8000, () => {
    console.log("Servidor rodando em http://localhost:8000")
})
