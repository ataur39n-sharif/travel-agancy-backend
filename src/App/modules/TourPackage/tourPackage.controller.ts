import catchAsync from "@/Utils/helper/catchAsync";
import {NextFunction, Request, Response} from "express";
import {TourPackageServices} from "@/App/modules/TourPackage/tourPackage.services";
import {sendResponse} from "@/Utils/helper/sendResponse";
import {z} from "zod";
import {pickFunction} from "@/Utils/helper/pickFunction";
import {Prisma} from "@prisma/client";
import {TourPackageValidation} from "@/App/modules/TourPackage/tourPackage.validation";

const getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await TourPackageServices.fetchAllPackages()

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Data fetched successfully.',
        data
    })

})

const getSingle = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'Id required'
    }).parse(req.params.id)

    const data = await TourPackageServices.fetchSinglePackage(id)
    sendResponse.success(res, {
        statusCode: 200,
        message: 'Data fetched successfully.',
        data
    })
})

const newPackage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = pickFunction<Prisma.TourPackageCreateInput, keyof Prisma.TourPackageCreateInput>(req.body, [
        "title", "description", "thumbnail", "location", "cost"
    ])

    const validateData = TourPackageValidation.createOrUpdatePayload.parse(
        payload
    )

    const data = await TourPackageServices.createNewPackage(validateData)

    sendResponse.success(res, {
        statusCode: 201,
        message: 'Successfully created new package.',
        data
    })
})

const updatePackage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'Id required'
    }).parse(req.params.id)

    const payload = pickFunction<Prisma.TourPackageUpdateInput, keyof Prisma.TourPackageCreateInput>(req.body, [
        "title", "description", "thumbnail", "location", "cost"
    ])

    const validateData = TourPackageValidation.createOrUpdatePayload.partial().parse(
        payload
    )

    const data = await TourPackageServices.updatePackage(id, validateData)

    sendResponse.success(res, {
        statusCode: 200,
        message: 'Successfully updated package data.',
        data
    })

})

const deletePackage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = z.string({
        required_error: 'Id required'
    }).parse(req.params.id)

    const data = await TourPackageServices.deletePackage(id)
    sendResponse.success(res, {
        statusCode: 200,
        message: 'Data deleted successfully.',
        data
    })
})


export const TourPackageController = {
    getAll,
    getSingle,
    newPackage,
    updatePackage,
    deletePackage
}