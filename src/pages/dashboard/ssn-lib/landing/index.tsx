import MenuLayout, { TopBarMenu } from "../../../../components/layout/menu-layout";
import React, { useMemo, useState } from 'react';
import { Button, Input, Radio, Typography, Empty, Segmented } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classes from './index.module.less';
import { SSNLibModel } from "./ssn-lib-model";
import { useStateFlow } from "../../../../utils/StateFlow";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const SSNLibrary: React.FC = () => {
    const totalItems = 0;
    const navigate = useNavigate()
    const model = useMemo(() => new SSNLibModel(navigate), []);
    const state = useStateFlow(model.state);

    return <MenuLayout
        selectedMenu={TopBarMenu.SSNLibrary}
    >
        <div style={{
            width: "100%",
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            padding: "0 10px"
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '32px'
            }}>
                <Title level={2} style={{ margin: 0, fontWeight: 600 }}>
                    SSN Library
                </Title>
                <Button
                    type="primary"
                    size="large"
                    onClick={model.handleAddSSN}
                    style={{
                        backgroundColor: '#1677ff',
                        borderRadius: '8px',
                        height: '40px',
                        padding: '0 32px',
                        fontSize: '15px',
                        fontWeight: 500
                    }}
                >
                    Add new SSN
                </Button>
            </div>

            {/* Controls Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '48px',
                paddingBottom: '24px',
                borderBottom: '1px solid #e8e8e8'
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
                        onChange={model.handleSortChange}
                        value={state.sortBy}
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
                        value={state.searchValue}
                        onChange={(v) => {
                            model.handleSearch(v.target.value);
                        }}
                        style={{
                            width: '280px',
                            borderRadius: '8px',
                            height: '40px'
                        }}
                    />
                </div>
            </div>

            {/* Empty State */}
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
        </div>
    </MenuLayout>
}


export default SSNLibrary;