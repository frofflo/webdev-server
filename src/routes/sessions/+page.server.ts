import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export const load = (async({cookies}) => {
    let id = cookies.get("id")
    if(!id){
        throw redirect(303, "/login")
    }
    const allSessions = await prisma.session.findMany({include: {messages: true}})
    let sessionList : {name: string, messages: any[]}[] = []
    allSessions.forEach((session : any) => {
        sessionList.push({
            name: session.name,
            messages: session.messages
        });
    });

    return {sessionList};
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({request, cookies}) => {
        let data = await request.formData();
        let user = cookies.get("username")?.toString();
        let sessionName = data.get("sessionName")?.toString();

        if(!sessionName){
            return fail(400, {sessionName: "Please supply a name"})
        }
        else if(await prisma.session.findFirst({where: {name: sessionName}})){
            return fail(400, {sessionName: "Session already exists."})
        }

        const User = await prisma.user.findFirst({where: {name: user}});
        if(User){
            await prisma.session.create({data: {
                name: sessionName,
            }})
        }
        else{
            return fail(400, {sessionName: "Unable to find user."})
        }        
        
    }
};