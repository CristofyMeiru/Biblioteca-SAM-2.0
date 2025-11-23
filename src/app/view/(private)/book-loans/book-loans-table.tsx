import {
  DataTable,
  DataTableContent,
  DataTableHeader,
  DataTableInputSearch,
  DataTablePagination,
} from '@/components/ui/data-table';

export default function BookLoansTable() {
  return (
    <div>
      <DataTable name="book-loans" columns={[]} data={[]} isLoading={false}>
        <DataTableHeader>
          <DataTableInputSearch />
        </DataTableHeader>
        <DataTableContent />
        <DataTablePagination />
      </DataTable>
    </div>
  );
}
