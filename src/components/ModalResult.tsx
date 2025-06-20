import React from 'react';
import { Button, Modal, Paper, Typography } from '@mui/material';
import Spacer from './Spacer';
import { BLACK, PINK } from '../constants/constants';

interface Props {
    open: boolean;
    onClose: () => void;
    words: number[][];
    letters: string[];
    indexes2kana: (arr: number[], letters: string[]) => string;
}

const ModalResult: React.FC<Props> = ({ open, onClose, words, letters, indexes2kana }) => {
    const history = words.slice(0, -1).map(w => indexes2kana(w, letters)).join(" ➡︎ ");

    return (
        <Modal open={open} sx={{ alignContent: "center" }}>
            <Paper sx={{ width: "80%", margin: "auto", padding: "20px", textAlign: "center" }}>
                <Typography sx={{ fontSize: "2.5em", fontWeight: "bold", color: PINK }}>Game Clear</Typography>
                <Spacer size={10} />
                <Typography sx={{ fontSize: "1.2em", fontWeight: "bold", color: BLACK }}>{history}</Typography>
                <Spacer size={20} />
                <Typography sx={{ fontSize: "1.5em", fontWeight: "bold", color: BLACK }}>
                    <span style={{ fontSize: "1.6em" }}>{words.length - 1}</span> words
                </Typography>
                <Spacer size={20} />
                <Button variant="contained" onClick={onClose} sx={{ backgroundColor: PINK, color: "white" }}>close</Button>
            </Paper>
        </Modal>
    );
};

export default ModalResult;
