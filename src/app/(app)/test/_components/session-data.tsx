import type { Session } from "next-auth";

export default function SessionData({ session }: { session: Session | null }) {
  if (session?.user) {
    return (
      <div className="flex w-full flex-col gap-4 rounded-md p-4">
        <h2 className="text-xl font-bold">Current Session Data</h2>
        <div className="flex flex-col rounded-md bg-card">
          <div className="rounded-t-md p-4 font-bold">Session</div>
          <pre className="whitespace-pre-wrap break-all px-4 py-6">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <p className="w-full rounded-md p-4">
      No session data, please <em>Sign In</em> first.
    </p>
  );
}
