import {Prisma, TourPackage} from "@prisma/client";
import {prisma} from "@/Config";

const fetchAllPackages = async (): Promise<TourPackage[]> => {
    return prisma.tourPackage.findMany()
}

const fetchSinglePackage = async (id: string): Promise<TourPackage | null> => {
    return prisma.tourPackage.findFirst({
        where: {
            id
        }
    })
}

const createNewPackage = async (payload: Prisma.TourPackageCreateInput): Promise<TourPackage> => {
    return prisma.tourPackage.create({
        data: payload
    })
}

const updatePackage = async (id: string, payload: Prisma.TourPackageUpdateInput): Promise<TourPackage> => {
    return prisma.tourPackage.update({
        where: {
            id
        },
        data: payload
    })
}

const deletePackage = async (id: string) => {
    return prisma.tourPackage.delete({
        where: {
            id
        }
    })
}

export const TourPackageServices = {
    fetchAllPackages,
    fetchSinglePackage,
    createNewPackage,
    updatePackage,
    deletePackage
}