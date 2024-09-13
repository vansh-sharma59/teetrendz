import { Suspense } from "react";
import ThankYou from "./Thankyou";

const Page = () => {
  return (
    <Suspense>
      <ThankYou />
    </Suspense>
  );
};

export default Page;
