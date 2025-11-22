import React from 'react';
import { Button, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import classes from './index.module.less';
import type { AddedSSNRecord } from '../../../../../pages/dashboard/ssn-lib/new/new-ssn-state';

const { Title, Text } = Typography;

interface AddedSSNsTableProps {
    addedSSNs: AddedSSNRecord[];
    onViewLibrary: () => void;
}

const AddedSSNsTable: React.FC<AddedSSNsTableProps> = ({
    addedSSNs,
    onViewLibrary
}) => {
    const columns: ColumnsType<AddedSSNRecord> = [
        {
            title: 'Added on',
            dataIndex: 'addedOn',
            key: 'addedOn',
            width: '15%',
            render: (text: string) => (
                <Text style={{ fontSize: '13px', color: '#595959' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Barcode',
            dataIndex: 'barcode',
            key: 'barcode',
            width: '12%',
            render: () => (
                <div style={{
                    width: '60px',
                    height: '30px',
                    background: '#FAFAFA',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #E8E8E8'
                }}>
                    <div style={{
                        width: '90%',
                        height: '70%',
                        background: 'repeating-linear-gradient(90deg, #262626 0px, #262626 1.5px, transparent 1.5px, transparent 3px)',
                        opacity: 0.8
                    }} />
                </div>
            ),
        },
        {
            title: 'SSN',
            dataIndex: 'ssn',
            key: 'ssn',
            width: '12%',
            render: (text: string) => (
                <Text strong style={{ fontSize: '14px', color: '#262626' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            width: '15%',
            render: (text: string) => (
                <Text style={{ fontSize: '14px', color: '#595959' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Style',
            dataIndex: 'style',
            key: 'style',
            width: '12%',
            render: (text: string) => (
                <Text style={{ fontSize: '14px', color: '#595959' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '22%',
            render: (text: string) => (
                <Text
                    style={{
                        fontSize: '14px',
                        color: '#595959',
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                    title={text}
                >
                    {text}
                </Text>
            ),
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            width: '12%',
            render: (text: string) => (
                <Text style={{ fontSize: '14px', color: '#595959' }}>
                    {text}
                </Text>
            ),
        },
    ];

    return (
        <div className={classes['added-ssns-section']}>
            <div className={classes['table-label']}>
                <Title level={4} style={{ margin: 0, fontWeight: 600 }}>Added SSNs</Title>
                <Button
                    type="link"
                    onClick={onViewLibrary}
                    style={{ color: '#1677ff', fontWeight: 500, padding: 0 }}
                >
                    View SSN Library
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={addedSSNs}
                pagination={false}
                rowKey={(record, index) => `${record.ssn}-${index}`}
                locale={{
                    emptyText: (
                        <div className={classes['empty-state']}>
                            <Text type="secondary" style={{ fontSize: '15px' }}>
                                Newly added SSNs will be shown here
                            </Text>
                        </div>
                    )
                }}
                className={classes['ssn-table']}
            />
        </div>
    );
};

export default AddedSSNsTable;
