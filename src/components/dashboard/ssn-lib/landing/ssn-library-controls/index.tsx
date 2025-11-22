import React from 'react';
import { Input, Segmented, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classes from './index.module.less';

const { Text } = Typography;

interface SSNLibraryControlsProps {
    sortBy: string;
    searchValue: string;
    totalItems: number;
    onSortChange: (value: string | number) => void;
    onSearchChange: (value: string) => void;
}

const SSNLibraryControls: React.FC<SSNLibraryControlsProps> = ({
    sortBy,
    searchValue,
    totalItems,
    onSortChange,
    onSearchChange
}) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Text
                    style={{
                        fontSize: '14px',
                        fontWeight: 600
                    }}
                >Sort by</Text>
                <Segmented
                    options={["S/N", "Recent"]}
                    shape="round"
                    className={classes["custom-segmented"]}
                    onChange={onSortChange}
                    value={sortBy}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <Text
                    style={{
                        color: '#666',
                        fontSize: '14px',
                        fontWeight: 600
                    }}
                >
                    <Text strong>Total items:</Text> {totalItems}
                </Text>
                <Input
                    placeholder="Search SSN"
                    prefix={<SearchOutlined style={{
                        color: '#bfbfbf',
                        marginRight: '8px'
                    }} />}
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                        width: '280px',
                        borderRadius: '8px',
                        height: '40px'
                    }}
                />
            </div>
        </div>
    );
};

export default SSNLibraryControls;
