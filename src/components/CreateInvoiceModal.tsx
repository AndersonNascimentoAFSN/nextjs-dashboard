'use client'

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/src/ui/modal"
import { Button } from "@/src/ui/button";
import { State } from "../lib/actions";

interface CreateInvoiceModalProps {
  state: State
}

export function CreateInvoiceModal({ state }: CreateInvoiceModalProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    const form = document.getElementById('create-invoice-form') as HTMLFormElement
    form.requestSubmit()

    console.log('state', state?.errors)

    if (state?.errors) {
      setOpen(false)
    }

    // const error = document.getElementById('customer-error') as HTMLFormElement
    // if (!error) {
    //   setOpen(false)
    // } else {
    //   console.log('error', error)
    // }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Salvar alterações</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Salvar alterações?</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja salvar as alterações realizadas no formulário?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5 flex justify-end">
          <DialogClose asChild>
            <Button
              className="flex h-10 items-center rounded-lg bg-gray-500 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 mr-3">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}