import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, getUserType } from "../../utils/local-storage/auth-local";
import { UserType } from "../../services/models/user-type";
import { Spin } from "antd";

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectUser = async () => {
            const userType = await getUserType();
            if (userType === UserType.Customer) {
                navigate('/dashboard/ssn-lib');
            } else if (userType === UserType.Vendor) {
                navigate('/dashboard/vendor');
            } else if (userType === UserType.SuperAdmin) {
                navigate('/dashboard/order-tracking');
            }
        };
        redirectUser();
    }, [navigate]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Spin size="large" />
        </div>
    )
};

export default DashboardPage;