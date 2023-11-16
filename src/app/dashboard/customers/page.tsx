import CustomersTable from "@/src/ui/customers/table";
import Search from "@/src/ui/search";
import { CustomersTableSkeleton } from "@/src/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Customers',
};

export default function Customers({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <div className="w-full">
      <h1 className='font-lusitana mb-8 text-xl md:text-2xl'>
        Customers
      </h1>
      <Search placeholder="Search customers..." />

      <Suspense fallback={<CustomersTableSkeleton />}>
        <CustomersTable query={query} />
      </Suspense>
    </div>
  )
}