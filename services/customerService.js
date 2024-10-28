import prisma from "@/lib/prisma";

export const findOrCreateCustomer = async (customerInfo, prismaClient = prisma) => {
    const customer = await prismaClient.customer.upsert({
        where: { email: customerInfo.email },
        update: {},
        create: {
            name: customerInfo.name,
            email: customerInfo.email,
            phoneNumber: customerInfo.phone,
        },
    });

    return customer;
};