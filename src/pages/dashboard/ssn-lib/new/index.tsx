import MenuLayout, { TopBarMenu } from "../../../../components/layout/menu-layout";
import React, { useMemo } from 'react';
import { Typography, Breadcrumb, Row, Col, Divider } from 'antd';
import { LeftCircleFilled, LeftOutlined } from '@ant-design/icons';
import { AddSSNModel as NewSSNModel } from "./new-ssn-model";
import { useStateFlow } from "../../../../utils/StateFlow";
import { useNavigate, useNavigation } from "react-router-dom";
import RFIDTypeSelector, { type RFIDType } from "../../../../components/dashboard/ssn-lib/new/rfid-type-selector";
import LayoutStyleSelector from "../../../../components/dashboard/ssn-lib/new/layout-style-selector";
import SSNFormInputs from "../../../../components/dashboard/ssn-lib/new/ssn-form-inputs";
import SSNPreviewCard from "../../../../components/dashboard/ssn-lib/new/ssn-preview-card";
import AddedSSNsTable from "../../../../components/dashboard/ssn-lib/new/added-ssns-table";

const { Title } = Typography;

const rfidTypes: RFIDType[] = [
    { id: 'normal', name: 'Normal RFID Tag', dimensions: '43 x 21 mm', price: 'S$0.12 / tag', icon: '🏷️' },
    { id: 'floating', name: 'Floating RFID Tag', dimensions: '43 x 36 mm', price: 'S$0.12 / tag', icon: '🏷️' },
    { id: 'metallic', name: 'Metallic RFID Tag', dimensions: '60 x 25 mm', price: 'S$0.56 / tag', icon: '🏷️' },
];

const NewSSNPage: React.FC = () => {
    const navigate = useNavigate();
    const model = useMemo(() => new NewSSNModel(navigate), [navigate]);
    const state = useStateFlow(model.state);

    const selectedRFIDInfo = rfidTypes.find(type => type.id === state.selectedRFIDType);

    return <MenuLayout selectedMenu={TopBarMenu.SSNLibrary}>
        <div style={{
            width: "100%",
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            padding: "24px"
        }}>
            {/* Breadcrumb */}
            <Breadcrumb
                style={{
                    marginBottom: '24px',
                    alignItems: 'center',
                }}
                items={[
                    {
                        title: (
                            <div
                                style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    cursor: 'pointer'
                                }}
                                onClick={() => navigate(-1)}
                            >
                                <LeftCircleFilled
                                    style={{
                                        marginRight: '8px',
                                        color: '#1677ff',
                                        fontSize: '20px',
                                    }}
                                />
                                <span
                                    style={{
                                        color: '#1677ff',
                                    }}
                                >
                                    SSN Library
                                </span>
                            </div>
                        ),
                    },
                    {
                        title: (
                            <span style={{
                                fontWeight: 700,
                                color: '#1677ff',
                            }}>
                                Add new SSN
                            </span>
                        ),
                    },
                ]}
            />

            {/* Header */}
            <Title level={2} style={{ margin: '0 0 24px 0', fontWeight: 600 }}>
                Add new SSN
            </Title>
            <Divider style={{ backgroundColor: '#D2DAE5' }} />
            <Row gutter={32}>
                {/* Left Column - Form */}
                <Col xs={24} lg={12}>
                    <RFIDTypeSelector
                        rfidTypes={rfidTypes}
                        selectedType={state.selectedRFIDType}
                        onSelect={model.handleRFIDTypeSelect}
                    />

                    <LayoutStyleSelector
                        selectedLayout={state.selectedLayout}
                        onSelect={model.handleLayoutChange}
                    />

                    <SSNFormInputs
                        ssnValue={state.ssnValue}
                        description={state.description}
                        size={state.size}
                        onSSNChange={model.handleSSNChange}
                        onDescriptionChange={model.handleDescriptionChange}
                        onSizeChange={model.handleSizeChange}
                    />
                </Col>

                {/* Right Column - Preview */}
                <Col xs={24} lg={12}>
                    <SSNPreviewCard
                        selectedRFIDInfo={selectedRFIDInfo}
                        canAdd={!!(state.selectedRFIDType && state.ssnValue)}
                        onAddToLibrary={model.handleAddToLibrary}
                        description={state.description}
                        size={state.size}
                    />
                </Col>
            </Row>
            <Divider style={{ backgroundColor: '#D2DAE5' }} />
            <AddedSSNsTable
                addedSSNs={state.addedSSNs}
                onViewLibrary={model.handleBack}
            />
        </div>
    </MenuLayout>
}

export default NewSSNPage;

