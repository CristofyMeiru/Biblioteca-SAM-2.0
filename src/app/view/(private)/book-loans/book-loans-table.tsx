import { BookLoansWithDetailsDTO } from '@/app/api/book-loans/book-loans.dto';
import {
  DataTable,
  DataTableContent,
  DataTableHeader,
  DataTableInputSearch,
  DataTablePagination,
} from '@/components/ui/data-table';
import apiClient from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { bookLoansTableColumns } from './book-loans-table-columns';

export default function BookLoansTable() {
  const { data: bookLoansData, isLoading: loadingBookLoansData } = useQuery<BookLoansWithDetailsDTO[]>({
    queryKey: ['book-loans'],
    queryFn: () => apiClient.get<BookLoansWithDetailsDTO[]>('/book-loans').then((res) => res.data),
  });

  return (
    <div>
      <DataTable
        name="book-loans"
        columns={bookLoansTableColumns}
        data={bookLoansData ?? []}
        isLoading={loadingBookLoansData}
      >
        <DataTableHeader>
          <DataTableInputSearch />
        </DataTableHeader>
        <DataTableContent />
        <DataTablePagination />
      </DataTable>
    </div>
  );
}
