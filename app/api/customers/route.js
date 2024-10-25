import prisma from "@/lib/prisma";

async function createCustomer(data) {
    const customer = await prisma.customer.create({
        data: {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
        },
    });
    return customer;
}