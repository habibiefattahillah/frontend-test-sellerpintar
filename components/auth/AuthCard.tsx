import CommonCard from "@/components/common/CommonCard";
import { Logo } from "@/components/icons/Logo";

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <CommonCard
      title={
        <div className="flex items-center justify-center">
          <Logo className="w-48" />
        </div>
      }
      className="border-none shadow-none sm:border sm:shadow-md sm:rounded-xl"
    >
      {children}
    </CommonCard>
  );
}
