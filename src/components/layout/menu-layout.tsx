import { Avatar, Row } from "antd";
import Layout, { Header } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";


interface MenuLayoutProps {
    selectedMenu?: TopBarMenu;
    onSelectMenu?: (menu: TopBarMenu) => void;
    isMenuVisible?: boolean,
    children?: React.ReactNode;
}

const MenuLayout: React.FC<MenuLayoutProps> = ({
    selectedMenu,
    onSelectMenu,
    isMenuVisible = true,
    children
}) => {
    const menuValues = Object.keys(TopBarMenu)
        .filter((key) => isNaN(Number(key)))
        .map((key) => TopBarMenu[key as keyof typeof TopBarMenu]);
    return <Layout style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "100%"
    }}>
        <Header style={{
            position: "sticky",
            backgroundColor: "white",
            maxWidth: "1200px",
            width: "100%",
            padding: "8px 24px",
            marginTop: "20px",
            height: "50px",
            borderRadius: "40px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            boxSizing: "border-box",
            zIndex: "100",
            top: "20px",
            margin: "0 auto",

            // Set the overall Header layout
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <div style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>

                <img src="/images/rfid-logo.svg" alt="Logo" />
                {
                    isMenuVisible ? <Row style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",

                        display: "flex",
                        gap: "20px",
                    }}>
                        {menuValues.map((menu) => {
                            return <NavLink
                                to={""}
                                key={menu}
                                style={{
                                    color: selectedMenu === menu ? "#265CD7" : "#000",
                                    fontWeight: 500,
                                }}
                            >{GetMenuLabel[menu]}</NavLink>
                        })}
                    </Row> : <></>
                }

                <Avatar icon={<UserOutlined />} src="/images/avatar-placeholder.png" />

            </div>
        </Header>
        <div style={{
            width: "100%",
            maxWidth: "1200px",
            paddingTop: "50px"
        }}>
            {children}
        </div>
    </Layout >
}

export default MenuLayout;

export enum TopBarMenu {
    SSNLibrary,
    NewOrder,
    OrderTracking,
    FAQ,
    Contact
}

const GetMenuLabel: Record<TopBarMenu, string> = {
    [TopBarMenu.SSNLibrary]: "SSN Library",
    [TopBarMenu.NewOrder]: "New Order",
    [TopBarMenu.OrderTracking]: "Order Tracking",
    [TopBarMenu.FAQ]: "FAQ",
    [TopBarMenu.Contact]: "Contact"
}