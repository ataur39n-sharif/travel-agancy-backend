import {Router} from "express";
import {TourPackageController} from "@/App/modules/TourPackage/tourPackage.controller";

const TourPackageRoutes = Router()

TourPackageRoutes
    .get('/', TourPackageController.getAll)
    .get('/:id', TourPackageController.getSingle)
    .post('/', TourPackageController.newPackage)
    .patch('/:id', TourPackageController.updatePackage)
    .delete('/:id', TourPackageController.deletePackage)

export default TourPackageRoutes