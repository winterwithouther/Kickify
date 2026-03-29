import express from 'express'
// import controller for custom items
import sneakersController from "../controllers/sneakersController.js"

const router = express.Router()

// define routes to get, create, edit, and delete items
// GET /sneakers
router.get("/", sneakersController.getSneakers)

// GET /sneakers/:id
router.get("/:id", sneakersController.getSneaker)

// POST
router.post("/", sneakersController.createSneaker)

// DELETE
router.delete("/:id", sneakersController.deleteSneaker)

export default router