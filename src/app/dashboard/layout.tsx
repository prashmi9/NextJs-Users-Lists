export default function Dashboard({
  children,
  users,
  notifications,
  login,
}: {
  children: React.ReactNode;
  users: React.ReactNode;
  notifications: React.ReactNode;
  login: React.ReactNode;
}) {
  const isLogin = true;
  return isLogin ? (
    <div>
      <div>{children}</div>
      <div className=" flex justify-between gap-x-6 py-5 ">
        <div className="flex min-w-0 gap-x-4">{users}</div>
        <div className="flex min-w-0 gap-x-4">{notifications}</div>
      </div>
    </div>
  ) : (
    login
  );
}
