import { fetchInvoicesPages } from "@/src/lib/data";
import Pagination from "./pagination";

export async function WrapperPagination({ query }: { query: string }) {
  const totalPages = await fetchInvoicesPages(query);

  return (
    <Pagination totalPages={totalPages} />
  )
}