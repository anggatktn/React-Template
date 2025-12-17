import React from 'react';
import { Button, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { User } from '../../../../../services/models/user-management';
import PhotoUpload from '../../add-user/photo-upload';

const { Title, Text } = Typography;

interface BusinessProfileTabProps {
    user: User;
    onEdit: () => void;
}

const BusinessProfileTab: React.FC<BusinessProfileTabProps> = ({ user, onEdit }) => {
    const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            padding: '12px 0',
            borderBottom: '1px solid #f0f0f0'
        }}>
            <Text style={{ fontSize: '14px', color: '#595959' }}>{label}</Text>
            <Text style={{ fontSize: '14px', color: '#262626' }}>{value}</Text>
        </div>
    );

    return (
        <div
            style={{
                gap: '24px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <PhotoUpload
                photo={user.photo || ""}
                onPhotoChange={() => { }}
            />

            {/* Business Information Section */}
            <div style={{ marginBottom: '32px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
                        Business Information
                    </Title>
                    <Button
                        type="link"
                        onClick={onEdit}
                        style={{
                            fontSize: '14px',
                            color: '#265CD7',
                            padding: 0
                        }}
                    >
                        Edit
                    </Button>
                </div>
                <div>
                    <InfoRow label="Vendor Code" value={user.vendorCode} />
                    <InfoRow label="Customer Name" value={user.name} />
                    <InfoRow label="Company Name" value={user.company} />
                    <InfoRow label="Company UEN" value={user.uen} />
                    <InfoRow label="Company Email" value={user.email} />
                    <InfoRow label="Customer Mobile" value={user.mobile} />
                </div>
            </div>

            {/* Company Address Section */}
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
                        Company Address
                    </Title>
                    <Button
                        type="link"
                        onClick={onEdit}
                        style={{
                            fontSize: '14px',
                            color: '#265CD7',
                            padding: 0
                        }}
                    >
                        Edit
                    </Button>
                </div>
                <div>
                    <InfoRow label="Address Line 1" value={user.companyAddress.addressLine1} />
                    <InfoRow label="Address Line 2" value={user.companyAddress.addressLine2} />
                    <InfoRow label="City/Town" value={user.companyAddress.city} />
                    <InfoRow label="State/Province/Region" value={user.companyAddress.state} />
                    <InfoRow label="Postal / ZIP Code" value={user.companyAddress.postalCode} />
                    <InfoRow label="Country" value={user.companyAddress.country} />
                </div>
            </div>
        </div>
    );
};

export default BusinessProfileTab;
