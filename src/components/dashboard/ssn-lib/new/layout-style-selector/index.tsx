import React from 'react';
import { Row, Col, Typography } from 'antd';
import classes from './index.module.less';

const { Text } = Typography;

interface LayoutStyleSelectorProps {
    selectedLayout: 'standard' | 'large-font';
    onSelect: (layout: 'standard' | 'large-font') => void;
}

const LayoutStyleSelector: React.FC<LayoutStyleSelectorProps> = ({
    selectedLayout,
    onSelect
}) => {
    return (
        <div style={{ marginBottom: '32px' }}>
            <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '16px' }}>
                Choose Layout Style
            </Text>
            <Row gutter={16}>
                <Col span={12}>
                    <div
                        className={`${classes['layout-card']} ${selectedLayout === 'standard' ? classes.selected : ''}`}
                        onClick={() => onSelect('standard')}
                    >
                        <Text strong style={{ fontSize: '15px' }}>Standard</Text>
                    </div>
                </Col>
                <Col span={12}>
                    <div
                        className={`${classes['layout-card']} ${selectedLayout === 'large-font' ? classes.selected : ''}`}
                        onClick={() => onSelect('large-font')}
                    >
                        <Text strong style={{ fontSize: '15px' }}>Large font</Text>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default LayoutStyleSelector;
