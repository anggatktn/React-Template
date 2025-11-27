import React from 'react';
import { Row, Col, Segmented, Input, Typography, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface FilterBarProps {
    totalItems: number;
    onSortChange: (value: string) => void;
    onFilterChange: (value: string) => void;
    onSearch: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ totalItems, onSortChange, onFilterChange, onSearch }) => {
    return (
        <Row align="middle" justify="space-between" style={{ marginBottom: 24 }} gutter={[16, 16]}>
            <Col xs={24} lg={16}>
                <Space wrap size={24}>
                    <Space>
                        <Text strong>Sort by</Text>
                        <Segmented
                            defaultValue="sn"
                            shape='round'
                            onChange={(value) => onSortChange(value as string)}
                            options={[
                                { label: 'S/N', value: 'sn' },
                                { label: 'Recent', value: 'recent' },
                            ]}
                        />
                    </Space>

                    <Space>
                        <Text strong>Filter</Text>
                        <Segmented
                            defaultValue="all"
                            onChange={(value) => onFilterChange(value as string)}
                            shape='round'
                            options={[
                                { label: 'All Status', value: 'all' },
                                { label: 'Payment required', value: 'payment_required' },
                                { label: 'Self Collection', value: 'self_collection' },
                            ]}
                        />
                    </Space>
                </Space>
            </Col>

            <Col xs={24} lg={8}>
                <Row align="middle" justify="end" gutter={16}>
                    <Col>
                        <Text>Total items: {totalItems}</Text>
                    </Col>
                    <Col flex="auto">
                        <Input
                            placeholder="Search Order ID"
                            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                            onChange={(e) => onSearch(e.target.value)}
                            style={{ borderRadius: 4 }}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default FilterBar;
