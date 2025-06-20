import React from 'react';

interface Props {
    size: number;
    horizontal?: boolean;
}

const Spacer: React.FC<Props> = ({ size, horizontal }) => (
    <div style={horizontal ? { width: size } : { height: size }} />
);

export default Spacer;
