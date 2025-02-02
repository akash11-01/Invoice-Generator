import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Invoices from "./pages/Invoices"
import Setting from "./pages/Setting"
import Home from "./pages/Home"
import NewInvoice from "./pages/NewInvoice"

function App() {
  return (
    <BrowserRouter>


      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route index element={<Home />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="setting" element={<Setting />} />
          <Route path="new-invoice" element={<NewInvoice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
