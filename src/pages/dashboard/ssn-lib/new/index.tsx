import MenuLayout from "../../../../components/layout/top-bar-menu/MenuLayout";
import React, { useMemo } from 'react';
import { Typography, Row, Col, Divider } from 'antd';
import { AddSSNModel as NewSSNModel } from "./new-ssn-model";
import { useStateFlow } from "../../../../utils/StateFlow";
import { useNavigate } from "react-router-dom";
import RFIDTypeSelector, { type RFIDType } from "../../../../components/dashboard/ssn-lib/new/rfid-type-selector";
import LayoutStyleSelector from "../../../../components/dashboard/ssn-lib/new/layout-style-selector";
import NewSSNFormInputs from "../../../../components/dashboard/ssn-lib/new/ssn-form-inputs/NewSSNFormInput";
import SSNPreviewCard from "../../../../components/dashboard/ssn-lib/new/ssn-preview-card";
import AddedSSNsTable from "../../../../components/dashboard/ssn-lib/new/added-ssns-table/AddedSSNTable";
import PageBreadcrumb from "../../../../components/dashboard/page-breadcrumb";
import { CustomerMenu } from "../../../../components/layout/top-bar-menu/customer-menu";
import MetallicTag from "../../../../assets/metallic-tag.png";
import NormalTag from "../../../../assets/normal-tag.png";
import FloatingTag from "../../../../assets/floating-tag.png";

const { Title } = Typography;

const rfidTypes: RFIDType[] = [
    {
        id: 'normal',
        name: 'Normal RFID Tag',
        dimensions: '43 x 21 mm',
        price: 'S$0.12 / tag',
        icon: <img src={NormalTag} alt="Normal RFID Tag" style={{ width: '32px', height: 'auto' }} />
    },
    {
        id: 'floating',
        name: 'Floating RFID Tag',
        dimensions: '43 x 36 mm',
        price: 'S$0.12 / tag',
        icon: <img src={FloatingTag} alt="Floating RFID Tag" style={{ width: '32px', height: 'auto' }} />
    },
    {
        id: 'metallic',
        name: 'Metallic RFID Tag',
        dimensions: '60 x 25 mm',
        price: 'S$0.56 / tag',
        icon: <img src={MetallicTag} alt="Metallic RFID Tag" style={{ width: '32px', height: 'auto' }} />
    },
];

const NewSSNPage: React.FC = () => {
    const navigate = useNavigate();
    const model = useMemo(() => new NewSSNModel(navigate), [navigate]);
    const state = useStateFlow(model.state);

    const selectedRFIDInfo = rfidTypes.find(type => type.id === state.selectedRFIDType);

    return <MenuLayout selectedMenu={CustomerMenu.SSNLibrary}>
        <div style={{
            width: "100%",
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            padding: "24px"
        }}>
            <PageBreadcrumb
                items={[
                    {
                        label: 'SSN Library',
                        onClick: () => navigate(-1)
                    },
                    {
                        label: 'Add new SSN',
                        isActive: true
                    }
                ]}
            />

            {/* Header */}
            <Title level={2} style={{ margin: '24px 0 24px 0', fontWeight: 600 }}>
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

                    <NewSSNFormInputs
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
                        onAddToLibrary={model.addNewSSN}
                        description={state.description}
                        size={state.size}
                        isLoading={state.isLoading}
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

