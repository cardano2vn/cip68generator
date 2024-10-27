import React from "react";

const Loading = function () {
  return (
    <div
      id="preloader"
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-[#13161b]"
      aria-label="Loading..."
    >
      <ul className="relative m-0 flex h-10 w-10 list-none flex-wrap p-0">
        <li
          className="h-1/3 w-1/3 animate-animate bg-white"
          style={{ animationDelay: "300ms" } as React.CSSProperties}
        />
        <li
          className="h-1/3 w-1/3 animate-animate bg-white"
          style={{ animationDelay: "400ms" } as React.CSSProperties}
        />
        <li
          className="h-1/3 w-1/3 animate-animate bg-white"
          style={{ animationDelay: "300ms" } as React.CSSProperties}
        />
        <li
          className="h-1/3 w-1/3 animate-animate bg-white"
          style={{ animationDelay: "200ms" } as React.CSSProperties}
        />
        <li
          className="h-1/3 w-1/3 animate-animate bg-white"
          style={{ animationDelay: "300ms" } as React.CSSProperties}
        />
        <li
          className="h-1/3 w-1/3 animate-animate bg-white"
          style={{ animationDelay: "400ms" } as React.CSSProperties}
        />
        <li
          className="h-1/3 w-1/3 animate-animate bg-white"
          style={{ animationDelay: "100ms" } as React.CSSProperties}
        />
        <li
          className="h-1/3 w-1/3 animate-animate bg-white"
          style={{ animationDelay: "200ms" } as React.CSSProperties}
        />
        <li
          className="h-1/3 w-1/3 animate-animate bg-white"
          style={{ animationDelay: "300ms" } as React.CSSProperties}
        />
      </ul>
    </div>
  );
};

export default Loading;
