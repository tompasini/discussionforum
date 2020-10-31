import { AuthController } from "./Controllers/AuthController.js";
import PostController from "./Controllers/PostController.js";
// import CommentController from "./Controllers/CommentController.js";

class App {
  authController = new AuthController();
  postController = new PostController();
  // commentController = new PostController();
}

window["app"] = new App();
