import React from 'react';
import { Empty, Typography } from 'antd';

const { Text } = Typography;

const SSNLibraryEmpty: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px'
        }}>
            <Empty
                description={
                    <div>
                        <Text style={{
                            fontSize: '18px',
                            color: '#999',
                            display: 'block',
                            marginBottom: '8px'
                        }}>
                            Your SSN Library is empty
                        </Text>
                        <Text style={{ fontSize: '14px', color: '#bfbfbf' }}>
                            Start by adding a new SSN record.
                        </Text>
                    </div>
                }
            />
        </div>
    );
};

export default SSNLibraryEmpty;
