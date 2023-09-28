import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export let _sessions : Map<string, {message:string,username:string}[]> = new Map();


export const load = (async({cookies}) => {
    let id = cookies.get("id")
    if(!id){
        throw redirect(303, "/login")
    }
    return {sessions:_sessions};
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({request}) => {
        let data = await request.formData();
        let sessionName = data.get("sessionName")?.toString();

        if(!sessionName){
            return fail(400, {sessionName: "Please supply a name"})
        }
        else if(_sessions.has(sessionName)){
            return fail(400, {sessionName: "Session already excist"})
        }

        _sessions.set(sessionName, []);
        
        
    }
};