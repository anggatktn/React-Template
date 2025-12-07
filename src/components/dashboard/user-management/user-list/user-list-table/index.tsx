import React from 'react';
import { Button, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { User } from '../../../../../services/models/user-management';

const { Text } = Typography;

interface UserListTableProps {
    users: User[];
    onViewEdit: (userId: string) => void;
}

const UserListTable: React.FC<UserListTableProps> = ({ users, onViewEdit }) => {
    const columns: ColumnsType<User> = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text: string) => (
                <Text style={{ fontSize: '13px', color: '#595959', whiteSpace: 'nowrap' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Vendor Code',
            dataIndex: 'vendorCode',
            key: 'vendorCode',
            render: (text: string) => (
                <Text strong style={{ fontSize: '14px', color: '#262626', whiteSpace: 'nowrap' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => (
                <Text style={{ fontSize: '14px', color: '#595959', whiteSpace: 'nowrap' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
            render: (text: string) => (
                <Text style={{ fontSize: '14px', color: '#595959', whiteSpace: 'nowrap' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'UEN',
            dataIndex: 'uen',
            key: 'uen',
            render: (text: string) => (
                <Text style={{ fontSize: '14px', color: '#595959', whiteSpace: 'nowrap' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: string) => (
                <Text style={{ fontSize: '14px', color: '#595959', whiteSpace: 'nowrap' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
            render: (text: string) => (
                <Text style={{ fontSize: '14px', color: '#595959', whiteSpace: 'nowrap' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="link"
                    onClick={() => onViewEdit(record.id)}
                    style={{
                        whiteSpace: 'nowrap',
                        color: '#265CD7',
                        padding: 0
                    }}>
                    View/Edit
                </Button>
            ),
        },
    ];

    return (
        <Table
            tableLayout="auto"
            columns={columns}
            dataSource={users}
            pagination={false}
            rowKey={(record) => record.id}
            className={"user-table"}
            locale={{
                emptyText: (
                    <div>
                        <Text type="secondary" style={{ fontSize: '15px' }}>
                            No users found
                        </Text>
                    </div>
                )
            }}
        />
    );
};

export default UserListTable;
