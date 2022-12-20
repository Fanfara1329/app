import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {AllRoutes} from  "./App";
import { QueryClientProvider, QueryClient } from "react-query";
import {BrowserRouter} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AllRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
