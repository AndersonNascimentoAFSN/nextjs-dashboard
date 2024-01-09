'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { signIn, signOut } from '@/src/auth';

const InvoicesSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['paid', 'pending'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
})

const CreateInvoice = InvoicesSchema.omit({ id: true, date: true })

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),

  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice',
    }
  }

  const { amount, customerId, status } = validatedFields.data

  const amountInCents = amount * 100
  const date = new Date().toISOString().split('T')[0]

  try {
    await sql`
        INSERT INTO Invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `
  } catch (error) {
    return {
      message: 'Database error: Failed to Create Invoice.'
    }
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

const UpdateInvoice = InvoicesSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, prevState: State, formData: FormData) {

  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice',
    }
  }

  const { amount, customerId, status } = validatedFields.data;

  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database error: Failed to Update Invoice',
    }
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice')

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' }
  } catch (error) {
    return {
      message: 'Database error: Failed to Delete Invoice.',
    }
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    await signIn('credentials', credentials);
    // await signIn('credentials', { ...credentials, redirectTo: '/dashboard' });
    // await signIn('credentials',  { ...Object.fromEntries(formData), redirectTo: '/dashboard' });
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialsSignin';
    }
    throw error;
  }
}

export async function logOut() {
  await signOut();
  // await signOut({ redirectTo: '/login' });
}

export async function createEdgeConfig({ slug }: { slug: string }) {
  try {
    const createEdgeConfig = await fetch(
      'https://api.vercel.com/v1/edge-config',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_REST_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: slug,
        }),
      },
    );
    const result = await createEdgeConfig.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
} 

export async function updateItems(item: any) {
  const url = `${process.env.VERCEL_REST_API}/edge-config/${process.env.EDGE_ID}/items` 

  try {
    console.log('item', item)

    const updated = await fetch(
      url,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_REST_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        body: JSON.stringify({ "items": [item] }),
      },
    );
    const result = await updated.json();
    console.log('result', result)
    return result
  } catch (error) {
    console.log(error);
  }
} 