import React from 'react';
import { Button, Divider, type SxProps, type Theme } from '@mui/material';
import Spacer from './Spacer';
import InputField from './InputField';
import ModalResult from './ModalResult';
import { useGameLogic } from '../hooks/useGameLogic';
import { EMPTY_CHAR } from '../constants/constants';


import { BLACK, PINK } from '../constants/constants';
function range(from: number, to: number): number[] {
    return ([...Array(to - from)].map((_, i) => (from + i)));
}

const GameBoard: React.FC<{ sx?: SxProps<Theme> }> = () => {
    const {
        isLoading,
        letters,
        result,
        open,
        kana,
        indexesList,
        henkanList,
        onChange,
        onKeyDown,
        indexes2kana,
        setOpen
    } = useGameLogic();

    const SIZE = 200;
    const HALF = SIZE / 2;
    const POINT_RADIUS = 8;
    const STROKE_WIDTH = 3;
    const FONT_SIZE = 20;
    const MARGIN_CONSTANT = 1.5;

    const relativeToAbsolute = (x: number) => (x / 3) * HALF;


    const points: [number, number][] = [
        [-2, -3],
        [0, -3],
        [2, -3],
        [3, -2],
        [3, 0],
        [3, 2],
        [2, 3],
        [0, 3],
        [-2, 3],
        [-3, 2],
        [-3, 0],
        [-3, -2]
    ];

    const labels: [number, number][] = [
        [0, -22],
        [0, -22],
        [0, -22],
        [22, 0],
        [22, 0],
        [22, 0],
        [0, 25],
        [0, 25],
        [0, 25],
        [-22, 0],
        [-22, 0],
        [-22, 0],
    ]


    return (
        <div style={{ width: '100%' }}>
            <h1>Letter Boxed JP</h1>
            <Button variant="outlined">あそびかた</Button>
            <Spacer size={10} />

            <svg
                width={SIZE * MARGIN_CONSTANT}
                height={SIZE * MARGIN_CONSTANT}
                viewBox={[-HALF * MARGIN_CONSTANT, -HALF * MARGIN_CONSTANT, SIZE * MARGIN_CONSTANT, SIZE * MARGIN_CONSTANT].join(" ")}
                style={{ border: "none", background: "none" }}
            >
                {/* 正方形 */}
                <rect
                    x={-HALF}
                    y={-HALF}
                    width={SIZE}
                    height={SIZE}
                    stroke={BLACK}
                    strokeWidth={STROKE_WIDTH}
                    fill="white"
                />
                {indexesList.map((indexes, j) => (indexes.length == 0) ? <div key={j}></div> :
                    range(0, indexes.length - 1).map(i => {
                        const [x1, y1] = points[indexes[i]].map(relativeToAbsolute)
                        const [x2, y2] = points[indexes[i + 1]].map(relativeToAbsolute)
                        return <g key={i} >
                            <line
                                fill="none"
                                stroke={(j == indexesList.length - 1) ? PINK : BLACK}
                                strokeDasharray={(j == indexesList.length - 1) ? 3 : 0}
                                opacity={1}
                                strokeWidth={STROKE_WIDTH * ((j == indexesList.length - 1) ? 1 : 0.7)}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                            />
                        </g>
                    })
                )}

                {range(0, 12).map((i) => {
                    const [x, y] = points[i].map(relativeToAbsolute)
                    const [dx, dy] = labels[i]
                    const color = indexesList.slice(0, -1).flat().includes(i) ? BLACK : BLACK
                    return <g key={i}>
                        <circle
                            cx={x}
                            cy={y}
                            r={POINT_RADIUS}
                            fill="white"
                            stroke={color}
                            strokeWidth={STROKE_WIDTH}
                        />
                        <text
                            x={x + dx}
                            y={y + dy}
                            fontSize={FONT_SIZE}
                            fontWeight="bold"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            dominantBaseline="middle"
                            fill={color}
                        >
                            {letters[i]}
                        </text>
                    </g>
                })}

                {indexesList.map((indexes, j) =>
                    range(0, indexes.length).map(i => {
                        const [x1, y1] = points[indexes[i]].map(relativeToAbsolute)
                        return <g key={i} >
                            <circle
                                cx={x1}
                                cy={y1}
                                r={POINT_RADIUS * 0.5}
                                fill={(j == indexesList.length - 1) ? PINK : BLACK}
                                stroke="none"
                                strokeWidth={STROKE_WIDTH}
                            />
                        </g>
                    })
                )}
            </svg>

            <InputField
                kana={kana}
                onChange={onChange}
                onKeyDown={onKeyDown}
                letters={letters}
                indexesList={indexesList}
            />

            <Spacer size={20} />

            <div style={{ color: result.color }}>{result.message || EMPTY_CHAR}</div>

            <Divider />

            <Spacer size={10} />

            <div>
                {range(0, henkanList.length).map((i) => (
                    <span key={i}>
                        <ruby style={{ fontSize: '1.4em' }}>
                            {indexes2kana(indexesList[i], letters)}
                            <rt style={{ fontSize: '0.6em' }}>{henkanList[i]}</rt>
                        </ruby>
                        <span> ➡︎ </span>
                    </span>
                ))}
            </div>

            <ModalResult
                open={open}
                onClose={() => setOpen(false)}
                words={indexesList}
                indexes2kana={indexes2kana}
                letters={letters}
            />

            <Spacer size={20} />

            <span>
                {(isLoading) ? "Loading..." : "Ready to play!"}
            </span>
        </div >
    );
};

export default GameBoard;
