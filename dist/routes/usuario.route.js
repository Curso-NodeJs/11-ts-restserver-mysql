"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const router = express_1.Router();
router.get('/', usuario_controller_1.getUsuarios);
router.get('/:id', usuario_controller_1.getUsuario);
router.post('/', usuario_controller_1.postUsuario);
router.put('/:id', usuario_controller_1.putUsuario);
router.delete('/:id', usuario_controller_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.route.js.map