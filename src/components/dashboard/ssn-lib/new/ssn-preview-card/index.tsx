import React from 'react';
import { Button, Row, Typography } from 'antd';
import classes from './index.module.less';
import type { RFIDType } from '../rfid-type-selector';

const { Text } = Typography;

interface SSNPreviewCardProps {
    selectedRFIDInfo?: RFIDType;
    description?: string;
    size?: string;
    canAdd: boolean;
    onAddToLibrary: () => void;
}

const SSNPreviewCard: React.FC<SSNPreviewCardProps> = ({
    selectedRFIDInfo,
    description,
    size,
    canAdd,
    onAddToLibrary
}) => {
    return (
        <div style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
        }}>
            <div style={{
                position: 'sticky',
                top: "70px",
                zIndex: 1,
                padding: '12px',
                gap: '16px',
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '1px solid #E8EDF0',
            }}>
                <Text strong style={{
                    fontSize: '16px',
                    display: 'block',
                }}>
                    Preview
                </Text>

                <div className={classes['preview-card']}>
                    <div
                        className={classes['barcode-preview']}
                    >
                        <div
                            style={{
                                flexGrow: 1,
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                textAlign: 'center',
                                backgroundColor: '#F0F0F0',
                                borderRadius: '2px',

                            }}
                        >
                            <Text
                                type="secondary"
                                style={{
                                }}
                            >Barcode will appear here</Text>
                        </div>
                        <Row
                            align={"bottom"}
                            justify={"space-between"}
                            style={{
                                width: '100%'
                            }}
                        >
                            <Text>{description || '-'}</Text>
                            <Text>{size || '-'}</Text>
                        </Row>
                    </div>
                    <div>
                        <div className={classes['info-row']}>
                            <Text strong>Type</Text>
                            <Text>{selectedRFIDInfo?.name || '-'}</Text>
                        </div>
                        <div className={classes['info-row']}>
                            <Text strong>Tag Dimension</Text>
                            <Text>{selectedRFIDInfo?.dimensions || '-'}</Text>
                        </div>
                        <div className={classes['info-row']}>
                            <Text strong>Printable Area</Text>
                            <Text>-</Text>
                        </div>
                    </div>
                </div>
                <Button
                    type="primary"
                    size="large"
                    block
                    onClick={onAddToLibrary}
                    disabled={!canAdd}
                    style={{
                        height: '48px',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: 500
                    }}
                >
                    Add to SSN Library
                </Button>
            </div>
        </div>
    );
};

export default SSNPreviewCard;
