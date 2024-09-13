import MaxWidthWrapper from "./MaxWidthWrapper";
import NavLinks from "./NavLinks";
import { AuthOptions, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const Navbar = async () => {
  const session = await getServerSession(authOptions as AuthOptions);

  let user: boolean = false;
  let isAdmin: boolean = false;

  if (session) {
    user = true;
  }

  if (session?.user?.email === process.env.ADMIN_EMAIL) {
    isAdmin = true;
  }

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <NavLinks isAdmin={isAdmin} user={user} />
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
