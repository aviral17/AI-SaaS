import Navbar from "@/components/navbar";
import Sidebar from "../../components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// Note that if we pass apiLimitCount simply without apiLimitCount={apiLimitCount} then it will be treated as Boolean so be careful
// We are passing the apiLimitCount via this server component as server components have access to Prisma Database so doing this and passing it to Clientside instead of directly calling it in Client Side as its not having access to Prisma Database

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900 sidebar_modal">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
