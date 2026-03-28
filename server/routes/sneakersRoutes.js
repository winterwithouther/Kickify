import express from 'express'
// import controller for custom items
import sneakersController from "../controllers/sneakersController.js"

const router = express.Router()

// define routes to get, create, edit, and delete items
// GET /sneakers
router.get("/", sneakersController.getSneakers)

// POST
router.post("/", sneakersController.createSneaker)


export default Router