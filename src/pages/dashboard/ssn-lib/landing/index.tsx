import MenuLayout from "../../../../components/layout/top-bar-menu/MenuLayout";
import { CustomerMenu } from "../../../../components/layout/top-bar-menu/customer-menu";
import React, { useMemo } from 'react';
import { SSNLibModel } from "./ssn-lib-model";
import { useStateFlow } from "../../../../utils/StateFlow";
import { useNavigate } from "react-router-dom";
import SSNLibraryHeader from "../../../../components/dashboard/ssn-lib/landing/ssn-library-header";
import SSNLibraryControls from "../../../../components/dashboard/ssn-lib/landing/ssn-library-controls";
import SSNLibraryEmpty from "../../../../components/dashboard/ssn-lib/landing/ssn-library-empty";
import { Button, Divider, Table } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { Typography } from "antd";
import classes from "./index.module.less";
import type { SSNItemResponse } from "../../../../services/ssn-service";
import BarcodeGen from "../../../../components/common/BarcodeGen";


const { Title, Text } = Typography;

import EditTagModal from "../../../../components/dashboard/ssn-lib/landing/edit-tag-modal/EditTagModal";

const SSNLibraryPage: React.FC = () => {
    const navigate = useNavigate();
    const model = useMemo(() => new SSNLibModel(navigate), [navigate]);
    const state = useStateFlow(model.state);

    const columns: ColumnsType<SSNItemResponse> = [
        {
            title: 'S/N',
            dataIndex: 'sn',
            key: 'sn',
            render: (text: string) => (
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ fontSize: '13px', color: '#595959', whiteSpace: 'nowrap' }}>
                        {text}
                    </Text>
                </div>
            ),
        },
        {
            title: 'Barcode',
            dataIndex: 'ssn',
            key: 'ssn',
            align: 'center',
            render: (text: string) => (
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <BarcodeGen
                        value={text}
                        width={1}
                        height={15}
                        fontSize={6}
                    />
                </div>
            ),
        },
        {
            title: 'SSN',
            dataIndex: 'ssn',
            key: 'ssn',
            align: 'center',
            render: (text: string) => (
                <Text strong style={{ fontSize: '14px', color: '#262626', whiteSpace: 'nowrap' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Tag Type',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            onHeaderCell: () => ({
                style: {
                    whiteSpace: 'nowrap',
                },
            }),
            render: (text: string) => (
                <Text
                    style={{
                        fontSize: '14px',
                        color: '#595959',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}

                >
                    {text}
                </Text>
            ),
        },
        {
            title: 'Style',
            dataIndex: 'layout_style',
            key: 'layout_style',
            align: 'center',
            render: (text: string) => (
                <Text
                    style={{
                        fontSize: '14px',
                        color: '#595959',
                        whiteSpace: 'nowrap'
                    }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '100%', // Keep this to make it expand
            ellipsis: true,
            render: (text: string) => (
                <Text
                    style={{
                        fontSize: '14px',
                        color: '#595959',
                        padding: '0px 6px'
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
            render: (text: string) => (
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ fontSize: '14px', color: '#595959', whiteSpace: 'nowrap' }}>
                        {text}
                    </Text>
                </div>
            ),
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: SSNItemResponse) => (
                <div style={{ display: 'flex', gap: '0px' }}>
                    <Button
                        type="link"
                        onClick={() => { }}
                        style={{
                            whiteSpace: 'nowrap',
                            color: '#D15A5A'
                        }}>
                        Delete
                    </Button>
                    <Button
                        type="link"
                        onClick={() => model.openEditModal(record)}
                        style={{
                            whiteSpace: 'nowrap',
                            color: '#265CD7'
                        }}>
                        View/Edit
                    </Button>
                </div>
            ),
        },
    ];


    return <MenuLayout selectedMenu={CustomerMenu.SSNLibrary}>

        <div className={classes["landing-container"]}>
            <SSNLibraryHeader onAddNew={model.handleAddSSN} />

            <SSNLibraryControls
                sortBy={state.sortBy}
                searchValue={state.searchValue}
                totalItems={state.ssnLibList.length}
                onSortChange={(value) => model.handleSortChange(String(value))}
                onSearchChange={model.handleSearch}
            />
            <Divider style={{
                backgroundColor: '#d1d9e3',
                height: '1px',
                margin: '12px 0'
            }} />
            {state.ssnLibList.length > 0 ? <div className={classes["ssn-table"]}>
                <Table
                    tableLayout="auto"
                    columns={columns}
                    dataSource={state.ssnLibList}
                    pagination={false}
                    rowKey={(record, index) => `${record.id}-${index}`}
                    locale={{
                        emptyText: (
                            <div >
                                <Text type="secondary" style={{ fontSize: '15px' }}>
                                    Newly added SSNs will be shown here
                                </Text>
                            </div>
                        )
                    }}
                />
            </div> : <SSNLibraryEmpty />}

            <EditTagModal
                visible={state.editModalVisible}
                initialData={state.editingItem}
                onCancel={model.closeEditModal}
                onSave={model.handleSaveSsn}
            />
        </div>
    </MenuLayout>
}

export default SSNLibraryPage;