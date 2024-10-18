import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const defaultStream = await db.stream.findFirst({
      where: {
        profileId: profile.id,
        isDefault: true,
      },
      include: {
        flows: {
          where: {
            name: "Zenith",
          },
        },
      },
    });

    if (!defaultStream || !defaultStream.flows[0]) {
      return new NextResponse("Default Zenith flow not found", { status: 404 });
    }

    const desktop = await db.desktop.create({
      data: {
        profileId: profile.id,
        name,
        appState: JSON.stringify({}), // Initialize with empty app state
      },
    });

    // Create OSStyle separately
    await db.oSStyle.create({
      data: {
        desktopId: desktop.id,
        flowId: defaultStream.flows[0].id,
      },
    });

    return NextResponse.json(desktop);
  } catch (error) {
    console.log("[DESKTOPS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
