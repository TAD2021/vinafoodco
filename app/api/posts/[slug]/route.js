import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req, {params}) {
    const { slug } = params;
    try {
        const post = await prisma.post.findUnique({
            where: { slug: slug },
        });

        if (!post) {
            return NextResponse.json({message: 'Post not found'}, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: 'Internal server error'}, { status: 500 });
    }
}