import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./ProfileForm";
import { PasswordForm } from "./PasswordForm";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({ where: { id: session!.user.id } });
  if (!user) return null;

  return (
    <div className="flex flex-col gap-8">
      <ProfileForm
        name={user.name}
        email={user.email}
        phone={user.phone ?? ""}
        address={user.address ?? ""}
      />
      <PasswordForm />
    </div>
  );
}
