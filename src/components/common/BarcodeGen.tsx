import React, { useEffect, useState, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { Image } from 'antd';

interface BarcodeGenProps {
    value: string;
    description?: string;
    width?: number;
    height?: number;
    fontSize?: number;
}

const BarcodeGen: React.FC<BarcodeGenProps> = ({
    value,
    description,
    width = 2,
    height = 40,
    fontSize = 14
}) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [displayDimensions, setDisplayDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        // High-DPI scaling factor
        const scale = 3;

        // Create a temporary canvas for the main drawing
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (ctx) {
            // Create a temporary canvas for the barcode
            const barcodeCanvas = document.createElement('canvas');

            try {
                // Generate barcode at scaled size
                JsBarcode(barcodeCanvas, value, {
                    format: "CODE128",
                    width: width * scale, // Scale up width
                    height: height * scale, // Scale up height
                    displayValue: true,
                    fontSize: fontSize * scale, // Scale up font
                    fontOptions: "bold",
                    margin: 0,
                    textMargin: 2 * scale // Scale margin
                });

                // Set dimensions for the main canvas in scaled units
                const barcodeWidth = barcodeCanvas.width;
                const barcodeHeight = barcodeCanvas.height;
                // Scale text padding
                const textPadding = description ? (14 * scale) : 0;

                // Use fixed padding (scaled)
                const paddingHorizontal = 16 * scale;

                // Force canvas width to match barcode width + padding
                const minWidth = containerWidth > 0 ? containerWidth * scale : (barcodeWidth + paddingHorizontal);
                canvas.width = Math.max(barcodeWidth + paddingHorizontal, minWidth);
                canvas.height = barcodeHeight + textPadding + (8 * scale); // Scale bottom padding

                // Draw white background
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Draw barcode centered
                const barcodeX = (canvas.width - barcodeWidth) / 2;
                ctx.drawImage(barcodeCanvas, barcodeX, 2 * scale); // Scale top offset

                // Draw description text if exists
                if (description) {
                    // Use scaled font size
                    const descFontSize = 5 * scale;
                    ctx.font = `500 ${descFontSize}px Inter, sans-serif`;
                    ctx.fillStyle = "#000000";
                    ctx.textAlign = "left";

                    const maxTextWidth = barcodeWidth;
                    let textToDraw = description;

                    // Simple truncation logic (measurements are naturally scaled because font is scaled)
                    if (ctx.measureText(textToDraw).width > maxTextWidth) {
                        while (ctx.measureText(textToDraw + "...").width > maxTextWidth && textToDraw.length > 0) {
                            textToDraw = textToDraw.slice(0, -1);
                        }
                        textToDraw += "...";
                    }

                    // Align text with start of barcode (no indentation)
                    // Scale vertical offset
                    ctx.fillText(textToDraw, barcodeX, barcodeHeight + (10 * scale));
                }

                // Convert to Data URL
                setImageUrl(canvas.toDataURL());

                // Store the logical (1x) dimensions for display
                setDisplayDimensions({
                    width: canvas.width / scale,
                    height: canvas.height / scale
                });

            } catch (e) {
                console.error("Barcode generation failed", e);
            }
        }
    }, [value, description, width, height, fontSize, containerWidth]);

    return (
        <div ref={containerRef} style={{
            border: '2px solid #D2DAE5',
            borderRadius: '8px',
            padding: '2px',
            display: 'flex',
            width: '100%',
            background: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'zoom-in'
        }}>
            {imageUrl && (
                <Image
                    src={imageUrl}
                    preview={true}
                    alt="Barcode"
                    // Constrain display size to logical dimensions to keep it checking small on screen
                    // but using the high-res image source.
                    width={displayDimensions.width}
                    height={displayDimensions.height}
                />
            )}
        </div>
    );
};

export default BarcodeGen;
