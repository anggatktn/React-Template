import { Avatar, Button, Divider, Row, Typography } from "antd";
import Layout, { Header } from "antd/es/layout/layout";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserType } from "../../../utils/local-storage/auth-local";
import { UserType } from "../../../services/models/user-type";
import { BaseMenu } from "./base-menu";
import { MENU_BY_USER_TYPE } from "./menu-registry";
import { SuperAdminMenu } from "./super-admin-menu";
import { CustomerMenu } from "./customer-menu";
import { useEffect, useState } from "react";
import { storageEncryption } from "../../../utils/encryption/StorageEncryption";

const { Text } = Typography;

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
    const [userType, setUserType] = useState<UserType | null>(null);
    const navigate = useNavigate();
    const [isPopUpAvatarVisible, setIsPopUpAvatarVisible] = useState(false);
    useEffect(() => {
        const loadUserType = async () => {
            const type = await getUserType();
            setUserType(type);
        };
        loadUserType();
    }, []);

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
                    fontWeight: selectedMenu === menu ? 700 : 500,
                }}
                onClick={() => onSelectMenu?.(menu)}
            >
                {menuInstance.getLabel(menu)}
            </NavLink>
        ));
    };

    const renderMenu = () => {
        // Return nothing if userType is not loaded yet
        if (!userType) return null;

        // Get menu instance based on user type (polymorphic behavior!)
        const menuInstance = MENU_BY_USER_TYPE[userType];
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

                <img
                    src="/images/rfid-logo.svg"
                    alt="Logo"
                    onClick={() => navigate('/dashboard')}
                    style={{
                        cursor: "pointer"
                    }}
                />
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

                <Avatar
                    icon={<UserOutlined />}
                    src="/images/avatar-placeholder.png"
                    onClick={() => {
                        setIsPopUpAvatarVisible(!isPopUpAvatarVisible);
                    }}
                    style={{
                        cursor: "pointer"
                    }}
                />
            </div>

            {isPopUpAvatarVisible ? <div
                style={{
                    position: "absolute",
                    right: "0%",
                    top: "100%",
                    marginTop: "10px",
                    display: "flex",
                    width: "max-content",
                    flexDirection: "column",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "16px 20px",
                        flexDirection: "row",
                    }}
                >
                    <Avatar
                        icon={<UserOutlined />}
                        src="/images/avatar-placeholder.png"
                        onClick={() => {
                            console.log("Avatar clicked");
                        }}
                        style={{
                            cursor: "pointer"
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: "14px",
                                fontWeight: 500,
                            }}
                        >
                            John Doe
                        </Text>
                        <Text
                            style={{
                                fontSize: "14px",
                                fontWeight: 400,
                            }}
                        >
                            Gear Turf Technology
                        </Text>
                    </div>
                </div>
                <Divider
                    style={{
                        margin: "0px 0px",
                        backgroundColor: "#E5E7EB",
                    }}
                />
                <Button
                    type="text"
                    onClick={() => {
                        storageEncryption.clearStorage();
                        navigate('');
                        setIsPopUpAvatarVisible(false);
                    }}
                    style={{
                        cursor: "pointer",
                        padding: "24px 20px",
                        borderRadius: "0 0 16px 16px",
                        display: "flex",
                        gap: "10px",
                        justifyContent: "flex-start",
                    }}
                    icon={<LogoutOutlined />}
                >
                    Logout
                </Button>
            </div> : <></>}
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
