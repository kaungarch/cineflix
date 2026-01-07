import { getServerSession } from "next-auth";
import { number, z, ZodError } from "zod";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();

    const { movieId } = z.object({ movieId: z.number() }).parse(body);

    const session = await getServerSession(authOptions);

    if (!session) return new Response("Unauthorized", { status: 401 });

    const removeFavorite = await db.favorite.delete({
      where: {
        userId_movieId: {
          userId: Number(session.user.id),
          movieId: movieId,
        },
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return new Response(`Unprocessable entity. ${error.message}`, {
        status: 422,
      });
  }

  return new Response("Fail to remove from favorite list.", { status: 500 });
};
