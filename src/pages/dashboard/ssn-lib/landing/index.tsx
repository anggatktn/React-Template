import MenuLayout, { TopBarMenu } from "../../../../components/layout/menu-layout";
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


const { Title, Text } = Typography;


const SSNLibraryPage: React.FC = () => {
    const totalItems = 0;
    const navigate = useNavigate();
    const model = useMemo(() => new SSNLibModel(navigate), [navigate]);
    const state = useStateFlow(model.state);

    const columns: ColumnsType<string> = [
        {
            title: 'S/N',
            dataIndex: 'sn',
            key: 'sn',
            render: (text: string) => (
                <Text style={{ fontSize: '13px', color: '#595959', whiteSpace: 'nowrap' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Barcode',
            dataIndex: 'barcode',
            key: 'barcode',
            render: () => (
                <div style={{
                    width: '60px',
                    height: '30px',
                    background: '#FAFAFA',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #E8E8E8'
                }}>
                    <div style={{
                        width: '90%',
                        height: '70%',
                        background: 'repeating-linear-gradient(90deg, #262626 0px, #262626 1.5px, transparent 1.5px, transparent 3px)',
                        opacity: 0.8
                    }} />
                </div>
            ),
        },
        {
            title: 'SSN',
            dataIndex: 'ssn',
            key: 'ssn',
            render: (text: string) => (
                <Text strong style={{ fontSize: '14px', color: '#262626', whiteSpace: 'nowrap' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Tag Type',
            dataIndex: 'tagType',
            key: 'tagType',
            onHeaderCell: () => ({
                style: {
                    whiteSpace: 'nowrap',
                },
            }),
            render: (text: string) => (
                <Text style={{ fontSize: '14px', color: '#595959', whiteSpace: 'nowrap' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Style',
            dataIndex: 'style',
            key: 'style',
            render: (text: string) => (
                <Text style={{ fontSize: '14px', color: '#595959', whiteSpace: 'nowrap' }}>
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
                <Text style={{ fontSize: '14px', color: '#595959', whiteSpace: 'nowrap' }}>
                    {text}
                </Text>
            ),
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: () => (
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
                        onClick={() => { }}
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


    return <MenuLayout selectedMenu={TopBarMenu.SSNLibrary}>

        <div className={classes["landing-container"]}>
            <SSNLibraryHeader onAddNew={model.handleAddSSN} />

            <SSNLibraryControls
                sortBy={state.sortBy}
                searchValue={state.searchValue}
                totalItems={totalItems}
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
                    rowKey={(record, index) => `${record}-${index}`}
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
        </div>
    </MenuLayout>
}

export default SSNLibraryPage;