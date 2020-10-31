import { AuthController } from "./Controllers/AuthController.js";
import PostController from "./Controllers/PostController.js";
import ValuesController from "./Controllers/ValuesController.js";

class App {
  authController = new AuthController();
  valuesController = new ValuesController();

  postController = new PostController();
}

window["app"] = new App();
