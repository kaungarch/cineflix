import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return new Response("Unauthorized", { status: 401 });

    const favoriteList = await db.favorite.findMany({
      where: { userId: Number(session.user.id) },
    });

    return NextResponse.json(favoriteList, { status: 200 });
  } catch (error) {
    return new Response("Fail to fetch data", { status: 500 });
  }
};
