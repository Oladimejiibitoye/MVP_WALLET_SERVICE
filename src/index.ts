import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import * as morgan from 'morgan';
import { port } from "./common/config/config";

function handleError(err, req, res, next) {
    res.status(err.stausCode || 500).send({message: err.message});

}

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    app.use(morgan('tiny'));
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, async(req: Request, res: Response, next: Function) => {
            try {
                const result = await (new (route.controller as any))[route.action](req, res, next)
                res.json(result)
            } catch (error) {
                next(error);
            }
            

        })
    })

    //handle Error
    app.use(handleError)
    // start express server
    app.listen(port)


    console.log(`Express server has started on port ${port}.`)

}).catch(error => console.log(error))
