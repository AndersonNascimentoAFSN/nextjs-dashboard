import { Metadata } from 'next';

import Form from '@/src/ui/invoices/create-form'
import Breadcrumbs from '@/src/ui/invoices/breadcrumbs'
import { fetchCustomers } from '@/src/lib/data'

export const metadata: Metadata = {
  title: 'Invoices Create',
};

export default async function Create() {
  const customers = await fetchCustomers();

  return (
    <main>
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
      <Form customers={customers} />
    </main>
  );
}