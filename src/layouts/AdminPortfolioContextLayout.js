import { Outlet } from "react-router-dom"
import { PortfolioContextProvider } from "../contexts/PortfolioContext"

const PortfolioContextLayout = () => {
  return (
    <PortfolioContextProvider>
      <Outlet />
    </PortfolioContextProvider>
  )
}

export default PortfolioContextLayout;
