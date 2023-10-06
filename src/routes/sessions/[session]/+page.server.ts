import type { PageServerLoad } from './$types';
import { error, fail, type Actions, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load = (async ({params, cookies}) => {
    const sessionName = params.session; // Här tror jag felet är med params då jag får en logg på params.session som heter [object Object]
    const username = cookies.get('username');

    if(!username){
        throw redirect(303, "/login")
    }
    let session = await prisma.session.findFirst({
        where: { name: sessionName },
        include: { messages: { include: { sender: true } } },
    });
    if (!session) {
        console.log(sessionName)
        throw error(404, 'Session not found');
    }
    
    return {
        session: session.name,
        messages: session.messages.map((message : any) => ({
          content: message.content,
          user: message.sender?.name,
        })),
        username: username,
    };}) satisfies PageServerLoad;

export const actions: Actions = {
    message: async ({ request, params, cookies }) => {
        const username = cookies.get("username");
        const sessionName = params.session;
        const formData = await request.formData();
        const msg = formData.get('message')?.toString();

        if (!msg) {
            return fail(300, {msg: "No Message To Send"})
        }
        const session = await prisma.session.findFirst({
            where: { name: sessionName },
        });
        if (!session) {
            throw error(404, 'Session not found');
        }
        
        const prismaUser = await prisma.user.findUnique({where: {name: username}});
        const id = prismaUser?.id ? prismaUser.id : -1;
    
        await prisma.message.create({
          data: {
            content: msg,
            userId: id, 
            sessionId: session.id,
          },
        });
    },
};