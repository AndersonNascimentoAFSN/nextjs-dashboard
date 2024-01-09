import { updateItems } from "../lib/actions"

export function EnableCreateInvoices() {
  return (
    <form action={async (formData) => {
      'use server'
      const valueInBoolean = formData.get('enable_feature_create_invoices') === 'true'
      
      const item = {
        operation: 'update',
        key: 'enable_feature_create_invoices',
        value: valueInBoolean,
      }

      updateItems(item)
    }}>
      <select name="enable_feature_create_invoices">
        <option value="true">Enabled</option>
        <option value="false">Disabled</option>
      </select>

      <button type="submit">Update</button>
    </form>
  )
}
