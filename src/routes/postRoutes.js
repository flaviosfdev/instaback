import express from "express"
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configuração de sistema de arquivos apenas para ambientes Windows 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads", storage })

// Configuração sistema de arquivos Linux e Mac
// const upload = multer({ dest: "./uploads" })

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));

    // Posts
    app.get("/posts", listarPosts);
    app.post("/posts", postarNovoPost);

    // Upload de img
    app.post("/upload", upload.single("imagem"), uploadImagem)
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;