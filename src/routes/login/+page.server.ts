import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load = (async ({ cookies }) => {
  let id = cookies.get("id");
  if (id) {
    throw redirect(303, "/");
  }
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    let username = data.get("username")?.toString();

    if (username) {
      const existingUser = await prisma.user.findUnique({
        where: {
          name: username,
        },
      });

      if (existingUser) {
        const providedPassword = data.get("password")?.toString();
        if (providedPassword != existingUser.password) {
          return fail(400, {password: "incorrect password"})

        } else {
          cookies.set("id", existingUser.id.toString());
          cookies.set("username", existingUser.name.toString());
  
          throw redirect(303, "/");
        }        
      } else {
        
        let password = data.get("password")?.toString();

        const newUser = await prisma.user.create({
          data: {
            name: username,
            password: password,
          },
        });

        cookies.set("id", newUser.id.toString());
        cookies.set("username", newUser.name.toString());
        throw redirect(303, "/");
      }
    }
  },
  logout: async ({ cookies }) => {
    let loggedOutUser = cookies.get("id");
    if (!loggedOutUser) {
    throw redirect(303, "/login");
    } else {
    cookies.delete("id")
    cookies.delete("username");
    throw redirect(303, "/login");
    }
  },
};
