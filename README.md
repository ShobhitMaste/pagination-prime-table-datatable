# PrimeReact DataTable with Pagination and Multi-Page Row Selection

This project demonstrates how to build a paginated data table using **PrimeReact** that supports:

- Checkbox-based row selection
- Multi-page selection using batch input
- API-based pagination
- Dynamic UI controls using overlay panels
---

## Features

- ✅ Paginated table using `Paginator`
- ✅ Checkbox selection with PrimeReact `DataTable`
- ✅ Select rows across multiple pages
- ✅ Batch row selection using number input in `OverlayPanel`
- ✅ Row click mode toggle
- ✅ Loading indicator with `react-loading-indicators`

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ShobhitMaste/pagination-prime-table-datatable.git
cd primereact-pagination-example
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
# or
npm start
```

---

## Technologies Used

- [React](https://reactjs.org/)
- [PrimeReact](https://primereact.org/)
- [PrimeIcons](https://primefaces.org/primeicons)
- [React Loading Indicators](https://www.npmjs.com/package/react-loading-indicators)

---

## How It Works

### Data Fetching

- Data is fetched using a custom `useFetch` hook from the Art Institute of Chicago API.
- Pagination is controlled via the API `page` parameter.

### Row Selection

- Selection mode is controlled by a toggle (`InputSwitch`).
- In **checkbox mode**, you can select individual rows or use the header checkbox to select all.
- A custom dropdown (`OverlayPanel`) allows you to input a number of rows to select (e.g., select next 25 rows).
- Selected rows persist even when you navigate between pages.

### Overlay Interaction

- The arrow (`˅`) in the header opens an `OverlayPanel`.
- Enter a number (e.g., 25) and submit to select that many rows across pages (in batches of 12).
- The logic ensures rows are selected as new pages load, using React state tracking.

---

## Project Structure

```
src/
├── App.tsx              # Main component with DataTable logic
├── hooks/
│   └── useFetch.ts      # Custom fetch hook for paginated API calls
├── main.tsx             # React entry point
└── styles/
    └── index.css        # Global styles and PrimeReact themes
```

---

## Customization

- You can modify the API endpoint in `baseURL` to fetch different data.
- Adjust the row selection logic to work with different batch sizes.
- Add filters or additional column data depending on your use case.

---

## Author

Created by Shobhit Singh