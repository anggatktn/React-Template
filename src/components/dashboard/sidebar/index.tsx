import React, { useState, type ReactNode } from "react"
import classes from "./index.module.less"

interface ISideBarMenu {
    menuName: string,
    icon: string,
    alt: string,
    section: SideBarMenuSection
}

enum SideBarMenuSection {
    MAIN, OTHER, HELPANDSETTING
}

class SideBarMenu {
    static OVERVIEW: ISideBarMenu = {
        menuName: "Overview",
        icon: "/images/overview-menu.svg",
        alt: "overview-menu",
        section: SideBarMenuSection.MAIN
    }
    static PATIENTS: ISideBarMenu = {
        menuName: "Patients",
        icon: "/images/patient-menu.svg",
        alt: "patients-menu",
        section: SideBarMenuSection.MAIN
    }
    static APPOINTMENT: ISideBarMenu = {
        menuName: "Appointment",
        icon: "/images/appointment-menu.svg",
        alt: "appointment-menu",
        section: SideBarMenuSection.MAIN
    }
    static REPORT: ISideBarMenu = {
        menuName: "Report",
        icon: "/images/report-menu.svg",
        alt: "report-menu",
        section: SideBarMenuSection.MAIN
    }


    static values(): ISideBarMenu[] {
        return [this.OVERVIEW, this.APPOINTMENT, this.PATIENTS, this.REPORT]
    }
}

type ISideBarMenuProps = {
    selectedMenu: SideBarMenu,
    onSelect: (menu: SideBarMenu) => void
}

const SideBar: React.FC<ISideBarMenuProps> = ({ selectedMenu, onSelect }) => {

    console.log(selectedMenu)
    return (
        <div className={classes["sidebar-container"]}>
            <div className={classes["logo-container"]}>
                <img src="/images/wecare-logo.svg" alt="Wecare Logo" className={classes["logo"]} />
                <span className={classes["logo-text"]}>Medical Admin Dashboard</span>
            </div>


            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column"
            }}>
                <span style={{
                    fontSize: "12px",
                    marginTop: "24px",
                    padding: "8px 16px",
                    width: "100%",
                }}>Main Menu</span>
                <div style={{
                }}>
                    {SideBarMenu.values().filter((menu) => menu.section == SideBarMenuSection.MAIN).map((menu) => {
                        const isSelected = selectedMenu === menu
                        return (
                            <div key={menu.menuName} onClick={() => { onSelect(menu) }} style={{
                                display: "flex",
                                alignContent: "center",
                                gap: "16px",
                                width: "100%",
                                padding: "12px 16px 12px 16px",
                                backgroundColor: isSelected ? "#F1F6EE" : "transparent",
                                cursor: "pointer"
                            }}>
                                <img src={menu.icon} alt={menu.alt} style={{
                                    width: "18px",
                                    height: "18px",
                                    color: isSelected ? "#2B7F75" : "#6C7278"
                                }} />
                                <span className="semibold-14" style={{
                                    color: isSelected ? "#2B7F75" : "#6C7278",
                                    fontWeight: isSelected ? 700 : 600
                                }}>{menu.menuName}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export { SideBar, SideBarMenu }