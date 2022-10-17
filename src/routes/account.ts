import { Router } from "express";
import AccountController from "../controller/AccountController";
import { auth } from "../middleware/auth";

const router = Router();

//create account
router.post("/create", [auth], AccountController.CreateAccount);
router.post("/fund/:id", [auth], AccountController.FundAccount);
router.post("/withdraw/:id", [auth], AccountController.withdrawFromAccount);
router.post("/transfer/:id", [auth], AccountController.TransferToOtherAccount)



export default router;