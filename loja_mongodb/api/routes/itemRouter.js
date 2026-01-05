import express from "express";
import itemController from "../controllers/itemController.js";

const router = express.Router();

router.get('/', itemController.getItems);
router.post('/', itemController.createItem);
router.delete('/:id', itemController.deleteItems);
router.put('/:id', itemController.updateItem);

export default router;