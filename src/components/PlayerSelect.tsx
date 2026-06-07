/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { PlayerCharacter } from '../types';

interface PlayerSelectProps {
    onPlayerSelect: (player: PlayerCharacter) => void;
    indImage: HTMLImageElement;
    ausImage: HTMLImageElement;
}

const PlayerSelect: React.FC<PlayerSelectProps> = ({ onPlayerSelect, indImage, ausImage }) => {
    return (
        <div className="player-select-overlay">
            <div className="player-select-container">
                <h2 className="player-select-title">Choose Your Player</h2>
                <div className="player-options">
                    <div className="player-card" onClick={() => onPlayerSelect('IND')} role="button" tabIndex={0} aria-label="Select India (IND)">
                        <img src={indImage.src} alt="India Batsman" />
                        <div className="player-name">IND</div>
                    </div>
                    <div className="player-card" onClick={() => onPlayerSelect('AUS')} role="button" tabIndex={0} aria-label="Select Australia (AUS)">
                        <img src={ausImage.src} alt="Australia Batsman" />
                        <div className="player-name">AUS</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerSelect;
