import type { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
    token: {
        colorPrimary: '#265CD7'
    },
    components: {
        Button: {
            colorPrimary: '#265CD7',
            colorBgContainerDisabled: 'rgba(38, 92, 215, 0.5)',
            colorTextDisabled: 'rgba(255, 255, 255, 0.8)',
        },
    }
};