import { notFound } from 'next/navigation'
import { Metadata } from 'next';

import Form from '@/src/ui/invoices/edit-form'
import Breadcrumbs from '@/src/ui/invoices/breadcrumbs'
import { fetchCustomers, fetchInvoiceById } from '@/src/lib/data'

export const metadata: Metadata = {
  title: 'Invoices Edit',
};

export default async function Edit({ params }: { params: { id: string } }) {
  const id = params.id

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ])

  if (!invoice) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}