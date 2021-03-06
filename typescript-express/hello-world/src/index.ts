import { Router } from "express";
import "reflect-metadata";
class IndexController {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  private routes() {
    this.router.get("/healthz", (_, res) => {
      res.status(200).send({success:"ok"});
    });
    this.router.get("/helloworld", (_, res) => {
      res.status(200).send({message:"Hello World"});
      });
  }
}
export default new IndexController().router;