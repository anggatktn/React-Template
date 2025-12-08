import MenuLayout from "../../../../components/layout/top-bar-menu/MenuLayout";
import React, { useMemo } from 'react';
import { UserListModel } from "./user-list-model";
import { useStateFlow } from "../../../../utils/StateFlow";
import { useNavigate } from "react-router-dom";
import UserListHeader from "../../../../components/dashboard/user-management/user-list/user-list-header";
import UserListControls from "../../../../components/dashboard/user-management/user-list/user-list-controls";
import UserListTable from "../../../../components/dashboard/user-management/user-list/user-list-table";
import { Divider } from "antd";
import classes from "./index.module.less";
import { SuperAdminMenu } from "../../../../components/layout/top-bar-menu/super-admin-menu";

const UserListPage: React.FC = () => {
    const navigate = useNavigate();
    const model = useMemo(() => new UserListModel(navigate), [navigate]);
    const state = useStateFlow(model.state);

    return (
        <MenuLayout selectedMenu={SuperAdminMenu.UserManagement}>
            <div className={classes["landing-container"]}>
                <UserListHeader onAddUser={model.handleAddUser} />


                <Divider style={{
                    backgroundColor: '#d1d9e3',
                    height: '1px',
                    margin: '0px 0'
                }} />
                <UserListControls
                    sortBy={state.sortBy}
                    searchValue={state.searchValue}
                    totalItems={state.userList.length}
                    onSortChange={(value) => model.handleSortChange(String(value))}
                    onSearchChange={model.handleSearch}
                />

                <div className={classes["user-table"]}>
                    <UserListTable
                        users={state.userList}
                        onViewEdit={model.handleViewEdit}
                    />
                </div>
            </div>
        </MenuLayout>
    );
}

export default UserListPage;
