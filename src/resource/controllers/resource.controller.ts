import { Router } from "express";
import { Request, Response } from "express";
import { checkRole } from "../../helpers/checkRole";
import multer from "multer";
import path from 'path';
import { createResource, readResources, removeResource } from "../services/resource.service";
import { ResourceDeleteError } from "../errors/resource.errors";

const resourceController = Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../',  'public', 'resources'))
    },

    filename: function (req, file, cb) {
        const { storageName } = req.query;

        if(storageName) {
            const extension =  file.originalname.slice(file.originalname.lastIndexOf('.'));
            req.query.storageName = storageName.toString() + extension;

            cb(null, req.query.storageName);
        }
    },    
})
  
const maxSizeFile = 1024 * 1024 * 40; // 40Mb
const upload = multer({ storage: storage, limits: { fileSize: maxSizeFile} });


resourceController.post('/create', upload.single('resources'), (req: Request, res: Response) => {

    const { storageName, originalName, id_task } = req.query;

    if(storageName && originalName && id_task) {

        createResource(originalName.toString(), storageName.toString(), id_task.toString())
        .then(() => res.status(200).send())
        .catch((e)=>   res.status(400).send());       
    }
});

resourceController.get('/read/resources', async (req: Request, res: Response) => {
    
    const { id_task } = req.query;

    if(id_task) {
        const resoureces =  await readResources(id_task.toString());
        res.status(200).send(resoureces);
    }
});


resourceController.delete('/delete', (req: Request, res: Response) => {

    const {payload: { role } } = req.body;
    
    checkRole(['DESIGNER'], role, res);

    const { id_resource } = req.query;

    if(id_resource) {
        removeResource(id_resource.toString())
        .then(() => res.status(200).send())
        .catch((err: ResourceDeleteError) => res.status(400).send(err.message));
    }
});

export default resourceController;