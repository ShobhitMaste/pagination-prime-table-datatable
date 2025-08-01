import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useRef, useState } from "react";
import useFetch from "./hooks/useFetch";
import { Paginator } from "primereact/paginator";
import { Atom } from "react-loading-indicators";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { InputSwitch } from "primereact/inputswitch";
import { OverlayPanel } from "primereact/overlaypanel";

type Details = {
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string | null;
  date_start: number;
  date_end: number;
  id: number;
};

const baseURL = "https://api.artic.edu/api/v1/artworks?page=";

function App() {
  // console.log("mount");
  const [page, setPage] = useState<number>(1);
  const { data, loading, error } = useFetch<Details[]>(baseURL + page);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedProducts, setSelectedProducts] = useState<Details[] | null>(
    null
  );
  const [rowClick, setRowClick] = useState(true);
  const [rangeSelect, setRangeSelect] = useState(0);
  const [selectionOnMultiplePages, setSelectionOnMultiplePages] = useState<
    number[]
  >([]);
  const [rangeSelectionClicked, setRangeSelectionClicked] =
    useState<boolean>(false);
  const op = useRef(null);

  useEffect(() => {
    if (!loading) {
      // console.log(selectionOnMultiplePages);
      let selection = selectionOnMultiplePages[page - 1];
      // console.log("start - " + selection + ", page - " + page);
      // console.log(data);
      data?.forEach((element) => {
        if (selection > 0) {
          // console.log("selection -> " + selection);
          if (!selectedProducts?.includes(element)) {
            //check again here
            setSelectedProducts((prev) => {
              return [...(prev || []), element];
            });
          }
          selection--;
        }
      });
      setSelectionOnMultiplePages((prev) => {
        const updated = [...prev];
        updated[page - 1] = 0;
        // console.log(updated[page - 1]);
        return updated;
      });
      setRangeSelectionClicked(false);
    }
  }, [loading, rangeSelectionClicked]);

  function handleSelectionRows(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    let range: number = formData.get("range");
    setRangeSelect(range);
    // console.log(data);
    // console.log(range);
    let multipleSelection = [];
    while (range != 0) {
      if (range > 12) {
        multipleSelection.push(12);
        range -= 12;
      } else {
        multipleSelection.push(range);
        range = 0;
      }
    }

    setSelectionOnMultiplePages(multipleSelection);

    // console.log("selection array - " + multipleSelection);
    setRangeSelectionClicked(true);
    op.current.hide();
  }

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-3xl mt-10 text-black font-bold">
        Pagination Example
      </h1>
      <div className="mt-10 px-10">
        {!loading && (
          <div>
            <div className="flex justify-content-center align-items-center mb-4 gap-2">
              <InputSwitch
                inputId="input-rowclick"
                checked={rowClick}
                onChange={(e) => setRowClick(e.value)}
              />
              <label htmlFor="input-rowclick">Row Click</label>
            </div>
            <DataTable
              value={data}
              selectionMode={rowClick ? null : "checkbox"}
              selection={selectedProducts}
              onSelectionChange={(e) => {
                // console.log(e.value);
                setSelectedProducts(e.value);
              }}
              dataKey="id"
            >
              <Column selectionMode="multiple" header="" />

              <Column
                header={() => (
                  <div className="flex items-center">
                    <i
                      className="pi pi-angle-down text-base cursor-pointer"
                      onClick={(e) => op.current.toggle(e)}
                      title="Bulk Select"
                    />
                    <OverlayPanel ref={op}>
                      <form
                        onSubmit={handleSelectionRows}
                        className="flex items-center"
                      >
                        <input
                          name="range"
                          type="number"
                          placeholder="Select Rows..."
                          className="border border-black px-2 py-1"
                        />
                        <button
                          className="ms-2 px-2 py-1 border border-black"
                          type="submit"
                        >
                          Submit
                        </button>
                      </form>
                    </OverlayPanel>
                  </div>
                )}
                body={() => null} // No content in body
                style={{ width: "50px" }} // Optional
              />
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
