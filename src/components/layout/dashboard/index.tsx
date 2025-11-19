import type { ReactNode } from "react"
import React from "react"
import classes from "./index.module.less"
import { SideBar, SideBarMenu } from "../../dashboard/sidebar";
import { TopBar } from "../../dashboard/topbar";

type DashboardLayoutProps = {
    isLoading: boolean,
    children: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ isLoading = false, children }) => {
    React.useEffect(() => {
        isLoading
    })
    return (
        <div style={{
            display: "flex",
        }}>
            <SideBar selectedMenu={SideBarMenu.OVERVIEW} onSelect={(menu: SideBarMenu) => {
                console.log(menu)
            }} />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                overflow: "hidden"
            }}>
                <TopBar/>
                <div style={{
                    backgroundColor: "#F9FAFB",
                    display: "flex",
                    flexGrow: 1
                }}>
                    {children}
                </div>
            </div>
        </div>
    )
}


export default DashboardLayout