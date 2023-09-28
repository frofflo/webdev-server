import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({cookies}) => {
    let id = cookies.get("id")
    if(!id){
        throw redirect(303, "/login")    
    }
    return {};
}) satisfies PageServerLoad;
