import React from 'react';
import { Button, Typography } from 'antd';
import type { DeliveryAddress } from '../../../../../services/models/user-management';

const { Title, Text } = Typography;

interface DeliveryAddressesTabProps {
    addresses: DeliveryAddress[];
    onEdit: (addressId: string) => void;
}

const DeliveryAddressesTab: React.FC<DeliveryAddressesTabProps> = ({ addresses, onEdit }) => {
    const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            padding: '12px 0',
            borderBottom: '1px solid #f0f0f0',
        }}>
            <Text style={{ fontSize: '14px', color: '#595959' }}>{label}</Text>
            <Text style={{ fontSize: '14px', color: '#262626' }}>{value}</Text>
        </div>
    );

    return (
        <div>
            {addresses.map((address, index) => (
                <div key={address.id} style={{
                    marginBottom: index < addresses.length - 1 ? '32px' : 0,
                    gap: '16px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px'
                    }}>
                        <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
                            {address.name}
                        </Title>
                        <Button
                            type="link"
                            onClick={() => onEdit(address.id)}
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
                        <InfoRow label="Address Line 1" value={address.addressLine1} />
                        <InfoRow label="Address Line 2" value={address.addressLine2} />
                        <InfoRow label="City/Town" value={address.city} />
                        <InfoRow label="State/Province/Region" value={address.state} />
                        <InfoRow label="Postal / ZIP Code" value={address.postalCode} />
                        <InfoRow label="Country" value={address.country} />
                        <InfoRow label="Delivery Contact Person" value={address.contactPerson} />
                        <InfoRow label="Delivery Contact Phone" value={address.contactPhone} />
                        <InfoRow label="Delivery Email" value={address.contactEmail} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DeliveryAddressesTab;
