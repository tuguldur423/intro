import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, vercelLink, image } = body;

    if (!vercelLink || typeof vercelLink !== "string") {
      return NextResponse.json(
        { error: "Vercel линк оруулна уу" },
        { status: 400 }
      );
    }

    const regex = /^https?:\/\/([\w-]+\.)?vercel\.app(\/.*)?$/;
    if (!regex.test(vercelLink)) {
      return NextResponse.json(
        {
          error: "Vercel линк буруу байна. Жишээ: https://my-project.vercel.app",
          input: vercelLink,
        },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title: title || "Vercel Project",
        description: description || "Тодорхойлолт байхгүй",
        vercelLink,
        image: image || "",
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Төсөл амжилттай нэмэгдлээ!", project });
  } catch (error) {
    console.error("Error saving project:", error);
    return NextResponse.json(
      {
        error: "Төсөл хадгалахад алдаа гарлаа",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, description, vercelLink, image } = body;

    if (!id) {
      return NextResponse.json({ error: "Төслийн ID оруулна уу" }, { status: 400 });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title: title || undefined,
        description: description || undefined,
        vercelLink: vercelLink || undefined,
        image: image || undefined,
      },
    });

    return NextResponse.json({ message: "Төсөл амжилттай шинэчлэгдлээ!", updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      {
        error: "Төсөл засварлахад алдаа гарлаа",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Төслүүдийг татахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}