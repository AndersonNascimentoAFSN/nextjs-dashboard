'use client';

import Link from "next/link";

import Breadcrumbs from "../ui/invoices/breadcrumbs";
import { CreateInvoiceModal } from "./CreateInvoiceModal";
import { State } from "../lib/actions";

interface HeaderProps {
  state: State
}

export function Header({ state }: HeaderProps) {
  return (
    <header className="flex justify-between items-end mb-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />

      <div className="flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>

        <CreateInvoiceModal state={state} />
      </div>

    </header>
  )
}
