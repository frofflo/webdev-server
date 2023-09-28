import type { PageServerLoad } from './$types';
import { _sessions } from '../+page.server';
import { error, fail, type Actions, redirect } from '@sveltejs/kit';

export const load = (async ({params, cookies}) => {
    let id = cookies.get("id")
    let username = cookies.get("username")

    if(!id){
        throw redirect(303, "/login")
    }
    let session = params.session;

    if(!_sessions.has(session)){
        throw error(404, "Session not found");
    }

    let messages = _sessions.get(session)!;


    return { session, messages, username };
}) satisfies PageServerLoad;

export const actions: Actions = {
    message: async ({ request, params, cookies }) => {
        let username = cookies.get("username")
        let session = params.session;

        if(!session || !_sessions.has(session)){
            throw error(404, "session not found")
        }

        let data = await request.formData();
        let message = data.get("message")?.toString();

        if(!message){
            return fail(400, {message:"there is no message to send"})
        }
        let messages = _sessions.get(session)!;
        if(username){
            messages?.push({message, username});
        }
    },
};