import React from 'react';

export enum ButtonVariant {
    PRIMARY, SECONDARY
}

interface ButtonProps {
    text: string;
    frontIcon?: React.ReactNode; // Allows passing JSX for icons
    backIcon?: React.ReactNode; // Allows passing JSX for icons
    onClick: () => void;
    variant: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({ text, frontIcon, onClick, variant, backIcon }) => {
    const buttonStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        padding: "0 24px",
        border: '1px solid #DCE4E8',
        cursor: 'pointer',
        minWidth: "100px",
        height: "45px",
        fontSize: '16px',
        fontWeight: '600',
        gap: '8px', // Space between icon and text
        backgroundColor: variant === ButtonVariant.PRIMARY ? "#2B7F75" : "white",
        color: variant === ButtonVariant.PRIMARY ? "white" : "black",
    };

    return (
        <button style={buttonStyle} onClick={onClick}>
            {frontIcon}
            <span style={{
                display: "inline-flex",
                alignItems: "center",
                lineHeight: 1.2,
            }}>{text}</span>
            { backIcon }
        </button >
    );
};

export default Button;