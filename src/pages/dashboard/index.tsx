import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserType } from "../../utils/local-storage/auth-local";
import { UserType } from "../../services/models/user-type";
import { Spin } from "antd";

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (getUserType() === UserType.Customer) {
            navigate('/dashboard/ssn-lib');
        } else if (getUserType() === UserType.Vendor) {
            navigate('/dashboard/vendor');
        } else if (getUserType() === UserType.SuperAdmin) {
            navigate('/dashboard/order-tracking');
        }
    }, []);

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