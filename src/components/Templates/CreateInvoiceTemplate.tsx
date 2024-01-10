'use client'

import { useFormState, useFormStatus } from 'react-dom';

import { createInvoice } from '@/src/lib/actions';
import Form from "@/src/ui/invoices/create-form";
import { Header } from "../Header";
import { CustomerField } from "@/src/lib/definitions";

export function CreateInvoiceTemplate({ customers }: { customers: CustomerField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createInvoice, initialState);

  return (
    <div>
      <Header state={state}/>
      <Form customers={customers} dispatch={dispatch} state={state}/>
    </div>
  )
}
