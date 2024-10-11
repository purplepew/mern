import { Outlet } from "react-router-dom"
import DashFooter from "./DashFooter"
const DashLayout = () => {
  return (
    <>
    <Outlet />
    <DashFooter />
    </>
  )
}

export default DashLayout