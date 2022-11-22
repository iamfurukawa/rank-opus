import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import { HomeType } from "./pages/Home/home.enum"

import Home from "./pages/Home"
import Rank from "./pages/Rank"

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rank />} />
        <Route path="/login" element={<Home type={HomeType.SIGN_IN} />} />
        <Route path="/register" element={<Home type={HomeType.REGISTER} />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )

}

export default Router
