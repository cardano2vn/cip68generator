import { PropsWithChildren } from "react";
export default async function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="lg:hidden h-screen flex items-center justify-center">
        <div className="text-white text-center py-6 px-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Important Notice!</h2>
          <p className="text-lg">The application is not optimized for mobile devices yet. Please use a desktop for the best experience.</p>
        </div>
      </div>
      <div className="hidden lg:block">{children}</div>
    </>
  );
}
