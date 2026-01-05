import React, { useEffect, useState } from 'react';
import { Modal, Input, Select, Button, Typography } from 'antd';
import BarcodeGen from '../../../../common/BarcodeGen';
import classes from './index.module.less';
import type { SSNItemResponse } from '../../../../../services/ssn-service';

const { Text } = Typography;
const { TextArea } = Input;

interface EditTagModalProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (data: SSNItemResponse) => void;
    initialData: SSNItemResponse | null;
}

const EditTagModal: React.FC<EditTagModalProps> = ({
    visible,
    onCancel,
    onSave,
    initialData
}) => {
    const [formData, setFormData] = useState<Partial<SSNItemResponse>>({});

    useEffect(() => {
        if (visible && initialData) {
            setFormData({ ...initialData });
        }
    }, [visible, initialData]);

    const handleLayoutChange = (style: string) => {
        setFormData(prev => ({ ...prev, layout_style: style }));
    };

    const handleSave = () => {
        if (initialData) {
            onSave({ ...initialData, ...formData } as SSNItemResponse);
        }
    };

    if (!initialData) return null;

    return (
        <Modal
            title={<Text style={{ fontSize: '20px', fontWeight: 600 }}>Edit Tag</Text>}
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={800}
            centered
            destroyOnHidden
        >
            <div className={classes['modal-content']}>
                {/* Left Side - Preview */}
                <div className={classes['preview-section']}>
                    <div className={classes['preview-card']}>
                        <div className={classes['barcode-wrapper']}>
                            <BarcodeGen
                                value={initialData.ssn}
                                width={1.5}
                                height={50}
                                fontSize={14}
                                addBorder={false}
                            />
                        </div>
                        <div className={classes['tag-info']}>
                            <span className={classes['tag-name']}>{formData.description}</span>
                            <span className={classes['tag-size']}>{formData.size}</span>
                        </div>
                    </div>

                    <div className={classes['info-rows']}>
                        <div className={classes['info-row']}>
                            <span className={classes['info-label']}>SSN</span>
                            <span className={classes['info-value']}>{initialData.ssn}</span>
                        </div>
                        <div className={classes['info-row']}>
                            <span className={classes['info-label']}>RFID type</span>
                            <span className={classes['info-value']}>{initialData.type}</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className={classes['form-section']}>
                    <div className={classes['form-group']}>
                        <span className={classes['label']}>Choose Layout Style</span>
                        <div className={classes['layout-options']}>
                            <Button
                                className={`${classes['layout-button']} ${formData.layout_style === 'Standard' ? classes['active'] : ''}`}
                                onClick={() => handleLayoutChange('Standard')}
                            >
                                Standard
                            </Button>
                            <Button
                                className={`${classes['layout-button']} ${formData.layout_style === 'Large font' ? classes['active'] : ''}`}
                                onClick={() => handleLayoutChange('Large font')}
                            >
                                Large font
                            </Button>
                        </div>
                    </div>

                    <div className={classes['form-group']}>
                        <div className={classes['label-row']}>
                            <span className={classes['label']}>Enter Description.</span>
                            <span className={classes['sub-label']}>Max 120 characters</span>
                        </div>
                        <TextArea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            maxLength={120}
                            style={{
                                resize: 'none',
                                borderRadius: '8px',
                                backgroundColor: '#FAFBFF',
                            }}
                        />
                    </div>

                    <div className={classes['form-group']}>
                        <div className={classes['label-row']}>
                            <span className={classes['label']}>Enter Size.</span>
                            <span className={classes['sub-label']}>(Optional)</span>
                        </div>
                        <Select
                            value={formData.size}
                            onChange={(value) => setFormData(prev => ({ ...prev, size: value }))}
                            style={{
                                width: '100%',
                                height: '40px',
                            }}
                            options={[
                                { value: 'XS', label: 'XS' },
                                { value: 'S', label: 'S' },
                                { value: 'M', label: 'M' },
                                { value: 'L', label: 'L' },
                                { value: 'XL', label: 'XL' },
                                { value: 'XXL', label: 'XXL' },
                            ]}
                            className={classes['custom-select']}
                        />
                    </div>

                    <div className={classes['footer']}>
                        <Button className={classes['cancel-btn']} onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button className={classes['save-btn']} onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default EditTagModal;
