// /root/lib/initial-profile.ts
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

const zenithFlowContent = {
  underlyingBg: "#292929",
  overlayingBg: "#010203",
  border: "#292929",
  black: "#000000",
  glass: "rgba(0, 0, 0, 0.3)",
  white: "#CCCCCC",
  active: "#28C840",
  warning: "#FEBC2E",
  error: "#FF5F57",
  lilacAccent: "#7B6CBD",
  tealAccent: "#003431",
  textPrimary: "#ABC4C3",
  textSecondary: "#748393",
  textPrimaryFont: "Arial",
  textSecondaryFont: "Inter",
};

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  // Create default Stream
  const defaultStream = await db.stream.create({
    data: {
      name: "Zenith",
      isDefault: true,
      profileId: newProfile.id,
    },
  });

  // Create Zenith Flow
  const zenithFlow = await db.flow.create({
    data: {
      name: "Zenith",
      description: "Default Zenith OS styling",
      content: zenithFlowContent,
      streamId: defaultStream.id,
    },
  });

  // Set Zenith Flow as the current OS style
  await db.oSStyle.create({
    data: {
      desktopId: newProfile.id,
      flowId: zenithFlow.id,
    },
  });

  return newProfile;
};
