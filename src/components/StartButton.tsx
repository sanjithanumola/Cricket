/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { GameState } from '../types';

interface StartButtonProps {
    onClick: () => void;
    gameState: GameState;
    commentaryStatus: string;
    isLoadingAssets: boolean;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick, gameState, commentaryStatus, isLoadingAssets }) => {

    const isDisabled = isLoadingAssets;
    let buttonText = 'Start Game';
    let buttonClass = 'start-button-main';

    if (isLoadingAssets) {
        buttonText = 'Loading...';
    } else if (gameState === 'GAME_OVER') {
        buttonText = 'Play Again?';
        buttonClass = 'btn-retro'; // Apply new retro style for "Play Again"
    }

    return (
        <button
            onClick={onClick}
            className={buttonClass} // Dynamically apply class
            disabled={isDisabled}
            aria-label={buttonText}
        >
            {buttonText}
        </button>
    );
};

export default StartButton;