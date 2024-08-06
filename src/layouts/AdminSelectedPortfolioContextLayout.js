import { Outlet } from "react-router-dom"
import { SelectedPortfolioContextProvider } from "../contexts/SelectedPortfolioContext"

const AdminSelectedPortfolioContextLayout = ({path}) => {
  return (
    <SelectedPortfolioContextProvider path={path}>
      <Outlet />
    </SelectedPortfolioContextProvider>
  )
}

export default AdminSelectedPortfolioContextLayout;
