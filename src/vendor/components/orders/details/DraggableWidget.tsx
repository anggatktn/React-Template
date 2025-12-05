import React, { useState, useEffect, useRef } from 'react';
import MessageIcon from '../../../../assets/message-icon.svg?react';

const DraggableWidget: React.FC = () => {
    const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const widgetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const newX = e.clientX - dragOffset.x;
                const newY = e.clientY - dragOffset.y;

                // Boundary checks to keep widget within viewport
                const maxX = window.innerWidth - (widgetRef.current?.offsetWidth || 60);
                const maxY = window.innerHeight - (widgetRef.current?.offsetHeight || 60);

                setPosition({
                    x: Math.min(Math.max(0, newX), maxX),
                    y: Math.min(Math.max(0, newY), maxY)
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    return (
        <div
            ref={widgetRef}
            style={{
                position: 'fixed',
                left: position.x,
                top: position.y,
                zIndex: 1000,
                cursor: isDragging ? 'grabbing' : 'grab',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#265CD7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: isDragging ? 'none' : 'box-shadow 0.3s ease',
            }}
            onMouseDown={handleMouseDown}
        >
            <MessageIcon style={{ width: '20px', height: '20px', color: 'white' }} />
        </div>
    );
};

export default DraggableWidget;
