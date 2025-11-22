import React from 'react';
import { Button, Row, Col, Typography } from 'antd';
import classes from './index.module.less';
import type { AddedSSNRecord } from '../../../pages/dashboard/ssn-lib/new/new-ssn-state';

const { Title, Text } = Typography;

interface AddedSSNsTableProps {
    addedSSNs: AddedSSNRecord[];
    onViewLibrary: () => void;
}

const AddedSSNsTable: React.FC<AddedSSNsTableProps> = ({
    addedSSNs,
    onViewLibrary
}) => {
    return (
        <div className={classes['added-ssns-section']}>
            <div className={classes['table-header']}>
                <Title level={4} style={{ margin: 0 }}>Added SSNs</Title>
                <Button
                    type="link"
                    onClick={onViewLibrary}
                    style={{ color: '#1677ff', fontWeight: 500 }}
                >
                    View SSN Library
                </Button>
            </div>

            {/* Table Headers */}
            <Row
                style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e8e8e8',
                    marginBottom: '16px'
                }}
                gutter={16}
            >
                <Col span={3}><Text type="secondary" strong>Added on</Text></Col>
                <Col span={3}><Text type="secondary" strong>Barcode</Text></Col>
                <Col span={3}><Text type="secondary" strong>SSN</Text></Col>
                <Col span={4}><Text type="secondary" strong>Product</Text></Col>
                <Col span={3}><Text type="secondary" strong>Style</Text></Col>
                <Col span={5}><Text type="secondary" strong>Description</Text></Col>
                <Col span={3}><Text type="secondary" strong>Size</Text></Col>
            </Row>

            {/* Table Rows or Empty State */}
            {addedSSNs.length === 0 ? (
                <div className={classes['empty-state']}>
                    <Text type="secondary" style={{ fontSize: '15px' }}>
                        Newly added SSNs will be shown here
                    </Text>
                </div>
            ) : (
                <div>
                    {addedSSNs.map((record, index) => (
                        <Row
                            key={index}
                            style={{
                                padding: '16px 0',
                                borderBottom: '1px solid #f0f0f0',
                                alignItems: 'center'
                            }}
                            gutter={16}
                        >
                            <Col span={3}>
                                <Text style={{ fontSize: '13px', color: '#666' }}>
                                    {record.addedOn}
                                </Text>
                            </Col>
                            <Col span={3}>
                                <div style={{
                                    width: '60px',
                                    height: '30px',
                                    background: '#f0f0f0',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid #d9d9d9'
                                }}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 4px)',
                                        opacity: 0.7
                                    }} />
                                </div>
                            </Col>
                            <Col span={3}>
                                <Text strong style={{ fontSize: '14px' }}>
                                    {record.ssn}
                                </Text>
                            </Col>
                            <Col span={4}>
                                <Text style={{ fontSize: '14px', color: '#666' }}>
                                    {record.product}
                                </Text>
                            </Col>
                            <Col span={3}>
                                <Text style={{ fontSize: '14px', color: '#666' }}>
                                    {record.style}
                                </Text>
                            </Col>
                            <Col span={5}>
                                <Text
                                    style={{
                                        fontSize: '14px',
                                        color: '#666',
                                        display: 'block',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                    title={record.description}
                                >
                                    {record.description}
                                </Text>
                            </Col>
                            <Col span={3}>
                                <Text style={{ fontSize: '14px', color: '#666' }}>
                                    {record.size}
                                </Text>
                            </Col>
                        </Row>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddedSSNsTable;
