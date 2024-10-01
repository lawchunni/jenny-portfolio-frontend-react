import { Outlet } from "react-router-dom"
import { SelectedPortfolioContextProvider } from "../contexts/SelectedPortfolioContext"

const AdminSelectedPortfolioContextLayout = () => {
  return (
    <SelectedPortfolioContextProvider isAdmin={true}>
      <Outlet />
    </SelectedPortfolioContextProvider>
  )
}

export default AdminSelectedPortfolioContextLayout;
