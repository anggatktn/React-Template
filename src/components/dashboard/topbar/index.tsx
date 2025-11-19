interface TopBarProps {
    
}

export const TopBar: React.FC<TopBarProps> = (props) => {
    return (
        <div style={{
            width: "100%",
            height: "72px",
            borderBottom: "1px solid #DCE4E8",
            display: "flex",
            justifyContent: "flex-end"
        }}>
            <span>Right Content</span>
        </div>
    )
}