import Pagination from '@/src/ui/invoices/pagination';
import Search from '@/src/ui/search';
import Table from '@/src/ui/invoices/table';
import { Suspense } from 'react';
import { Metadata } from 'next';

import { CreateInvoice } from '@/src/ui/invoices/buttons';
import { InvoicesTableSkeleton } from '@/src/ui/skeletons';
import { fetchInvoicesPages } from '@/src/lib/data';
import { WrapperPagination } from '@/src/ui/invoices/wrapper-pagination';

export const metadata: Metadata = {
  title: 'Invoices',
};

export default function Invoices(
  {
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }
) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-font-lusitana text-2xl">Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <WrapperPagination query={query} />
        </Suspense>
        {/* <Pagination totalPages={totalPages} query={query}/> */}
      </div>
    </div>
  )
}