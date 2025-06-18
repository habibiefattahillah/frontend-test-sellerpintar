// components/common/FormCard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FormCard({
  title,
  description,
  children,
  footer,
  className,
}: {
  title?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={`w-[400px] rounded-xl py-10 px-4 border border-gray-200 bg-white shadow-md space-y-2 ${className}`}
    >
      {(title || description) && (
        <CardHeader className="p-0 space-y-1">
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="p-0">{children}</CardContent>
      {footer && (
        <CardFooter className="p-0 pt-4 flex flex-col gap-2">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
