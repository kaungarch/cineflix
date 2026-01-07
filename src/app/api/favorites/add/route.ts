import { db } from "@/lib/db";
import { FAVORITE } from "@/types/favorite";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { authOptions } from "../../auth/[...nextauth]/route";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { movieId, movieTitle, poster_path, releasedDate } = FAVORITE.omit({
      id: true,
      userId: true,
    }).parse(body);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const addFavorite = await db.favorite.create({
      data: {
        userId: Number(session.user.id),
        movieId,
        movieTitle,
        releasedDate,
        poster_path,
      },
    });

    return NextResponse.json(addFavorite, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(`Unprocessable entity. ${error.message}`, {
        status: 422,
      });
    }

    return new Response("Fail to add favorite movie.", { status: 500 });
  }
};
