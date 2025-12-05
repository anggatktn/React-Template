import { Avatar, Row } from "antd";
import Layout, { Header } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { getUserType } from "../../../utils/local-storage/auth-local";
import { UserType } from "../../../services/models/user-type";
import { BaseMenu } from "./base-menu";
import { MENU_BY_USER_TYPE } from "./menu-registry";
import { SuperAdminMenu } from "./super-admin-menu";
import { CustomerMenu } from "./customer-menu";

interface MenuLayoutProps {
    selectedMenu?: CustomerMenu | SuperAdminMenu;
    onSelectMenu?: (menu: CustomerMenu | SuperAdminMenu) => void;
    isMenuVisible?: boolean;
    children?: React.ReactNode;
}

const MenuLayout: React.FC<MenuLayoutProps> = ({
    selectedMenu,
    onSelectMenu,
    isMenuVisible = true,
    children
}) => {
    const userType = getUserType();

    const renderMenuItems = (menuInstance: BaseMenu) => {
        const menuEnum = menuInstance.getMenuEnum();
        const menuValues = (
            Object.keys(menuEnum) as (keyof typeof menuEnum)[]
        ).filter((key) => isNaN(Number(key)))
            .filter((key) => key !== 'getLabel')
            .filter((key) => key !== 'getRoute')
            .filter((key) => key !== 'getMenuEnum')
            .map((key) => menuEnum[key]);

        return menuValues.map((menu) => (
            <NavLink
                to={menuInstance.getRoute(menu)}
                key={menu}
                style={{
                    color: selectedMenu === menu ? "#265CD7" : "#000",
                    fontWeight: 500,
                }}
            >
                {menuInstance.getLabel(menu)}
            </NavLink>
        ));
    };

    const renderMenu = () => {
        // Get menu instance based on user type (polymorphic behavior!)
        const menuInstance = MENU_BY_USER_TYPE[userType || UserType.Customer];
        return renderMenuItems(menuInstance);
    };

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
                        {renderMenu()}
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
