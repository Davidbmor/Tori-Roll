import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";

export const createUsuarioRoutes = (usuarioController: UsuarioController) => {
  const router = Router();

  router.post("/auth/login", usuarioController.login);

  router.get("/usuarios", usuarioController.obtenerUsuarios);

  return router;
};
