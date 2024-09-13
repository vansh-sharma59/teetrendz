import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const consfiguration = await db.configuration.findUnique({
    where: {
      id,
    },
  });

  if (!consfiguration) {
    return notFound();
  }

  return <DesignPreview configuration={consfiguration} />;
};

export default Page;
