import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import useFetch from "./hooks/useFetch";
import { Paginator } from "primereact/paginator";
import { Atom } from "react-loading-indicators";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { InputSwitch } from "primereact/inputswitch";

type Details = {
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string | null;
  date_start: number;
  date_end: number;
};

const baseURL = "https://api.artic.edu/api/v1/artworks?page=";

function App() {
  const [page, setPage] = useState<number>(0);
  // const [data, setData] = useState<Details | null>(null);
  const { data, loading, error } = useFetch<Details[]>(baseURL + page);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
    console.log(event.page);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-3xl mt-10 text-black font-bold">Pagination Example</h1>
      <div className="mt-10 px-10">
        {!loading && (
          <div>
            {/* <InputSwitch checked={rowClick} onChange={(e) => setRowClick(e.value)} />
            <DataTable
              value={data}
              rows={12}
              className="p-datatable-striped p-datatable-gridlines p-datatable-sm"
              rowsPerPageOptions={[5, 10, 25, 50]}
            > */}
              
            {/* <InputSwitch checked={rowClick} onChange={(e) => setRowClick(e.value)} /> */}
              {/* selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }} */}
            <DataTable value={data}>
              <Column selectionMode="multiple"></Column>
              <Column field="title" header="title"></Column>
              <Column field="place_of_origin" header="place_of_origin"></Column>
              <Column field="artist_display" header="artist_display"></Column>
              <Column field="inscriptions" header="inscriptions"></Column>
              <Column field="date_start" header="date_start"></Column>
              <Column field="date_end" header="date_end"></Column>
            </DataTable>
            <div className="card">
              <Paginator
                first={first}
                rows={rows}
                totalRecords={10780}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        )}
        {loading && (
          <div>
            <Atom color="#32cd32" size="medium" text="" textColor="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
