import { PropsWithChildren } from "react";
import Header from "./header";
import Footer from "./footer";

export default function LandingLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <Header />
      <div>{children}</div>
      <Footer />
    </main>
  );
}
