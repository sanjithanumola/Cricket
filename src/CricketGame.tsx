/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

import { useGameAssets } from './hooks/useGameAssets';
import { useLiveCommentary } from './hooks/useLiveCommentary';
import { useGameEngine } from './hooks/useGameEngine';
import { PlayerCharacter, TutorialStep, GameSettings } from './types';

import Scoreboard from './components/Scoreboard';
import GameCanvas from './components/GameCanvas';
import StartButton from './components/StartButton';
import ImpactMessage from './components/ImpactMessage';
import MobileControls from './components/MobileControls';
import MessageDisplay from './components/MessageDisplay';
import PlayerSelect from './components/PlayerSelect';

/**
 * The main Cricket Game component.
 * This component now acts as a "composition root". It initializes all the
 * custom hooks responsible for different parts of the game (assets, commentary, game logic)
 * and then passes the state and callbacks down to the presentational components.
 */
function CricketGame() {
    const assets = useGameAssets();
    const commentary = useLiveCommentary();
    const game = useGameEngine({ assets, commentary });

    const handleSetupComplete = (settings: GameSettings) => {
        game.setupWasCompleted(settings);
    };

    const showPlayerSelect = game.currentGameState === 'PLAYER_SELECT';
    const showStartButton = !showPlayerSelect && !game.isInningsBreak && (game.currentGameState === 'IDLE' || game.currentGameState === 'GAME_OVER' || game.currentGameState === 'LOADING');
    const showControls = game.currentGameState === 'BOWLING' || game.currentGameState === 'READY' || (game.currentGameState === 'TUTORIAL' && ['AIM_OFF', 'AIM_STRAIGHT', 'AIM_LEG', 'SWING_PRACTICE'].includes(game.tutorialStep));
    const showSwingInstruction = game.currentGameState === 'BOWLING' || game.currentGameState === 'READY';


    return (
        <div className="immersive-container">
            <header className="game-header">
                <h1>Run Chase!</h1>
            </header>

            {showPlayerSelect && (
                <PlayerSelect
                    onSetupComplete={handleSetupComplete}
                    indImage={assets.batsmanImageRef.current}
                    ausImage={assets.dhBatsmanImageRef.current}
                />
            )}

            {showStartButton && (
                 <div className="start-game-overlay">
                    <div className="start-game-content">
                        <StartButton
                            onClick={game.startGame}
                            gameState={game.currentGameState}
                            commentaryStatus={commentary.commentaryStatus}
                            isLoadingAssets={!assets.assetsLoaded.all}
                        />
                        <div className="game-instructions-panel">
                            <h3>Controls</h3>
                            <div className="desktop-controls-instructions">
                                <p>Aim: <span className="key-highlight">&larr;</span> <span className="key-highlight">&uarr;</span> <span className="key-highlight">&rarr;</span></p>
                                <p>{game.userRole === 'BOWL' ? 'Bowl' : 'Hit'}: <span className="key-highlight">SPACEBAR</span></p>
                            </div>
                            <div className="mobile-controls-instructions">
                                <p>Aim: D-Pad Buttons</p>
                                <p>{game.userRole === 'BOWL' ? 'Bowl' : 'Hit'}: <span className="key-highlight">{game.userRole === 'BOWL' ? 'BOWL' : 'SWING'}</span> Button</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {game.isInningsBreak && (
                <div className="start-game-overlay" style={{ zIndex: 100 }}>
                    <div className="start-game-content" style={{ border: '4px solid #00FFCC', padding: '30px' }}>
                        <h2 style={{ color: '#00FFCC', textDecoration: 'underline', fontSize: '1.4rem', marginBottom: '20px', textTransform: 'uppercase' }}>
                            INNINGS COMPLETE!
                        </h2>
                        <div className="game-instructions-panel" style={{ marginBottom: '24px', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.85rem', color: '#fff', margin: '10px 0' }}>
                                Innings 1 score: <span style={{ color: '#e7d86f', fontSize: '1.1rem' }}>{game.firstInningsScore} runs</span>
                            </p>
                            <p style={{ fontSize: '0.75rem', color: '#ababab', marginTop: '12px' }}>
                                Swapping sides! You will now {game.userRole === 'BAT' ? 'BOWL' : 'BAT'} in Innings 2.
                            </p>
                            <p style={{ fontSize: '0.8rem', color: '#00FFCC', marginTop: '12px' }}>
                                Target to win: <span style={{ color: '#00FFCC', fontSize: '1rem' }}>{game.firstInningsScore ? game.firstInningsScore + 1 : 1} runs</span>
                            </p>
                        </div>
                        <button
                            onClick={game.startInnings2}
                            style={{
                                width: '100%',
                                backgroundColor: '#00FFCC',
                                color: '#111',
                                fontSize: '1.1rem',
                                padding: '12px',
                                border: '3px solid #fff',
                                boxShadow: '4px 4px 0px #000',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            START INNINGS 2!
                        </button>
                    </div>
                </div>
            )}

            <div className="game-message-container">
                <MessageDisplay
                    message={game.message}
                    commentaryStatus={commentary.commentaryStatus}
                />
                {showSwingInstruction && (
                    <div className="swing-instruction">
                        Press <span className="key-highlight">SPACEBAR</span> to {game.userRole === 'BOWL' ? 'Bowl' : 'Swing'}
                    </div>
                )}
            </div>

            <GameCanvas
                canvasRef={game.canvasRef}
                ball={game.ball}
                batsman={game.batsman}
                bat={game.bat}
                stumps={game.stumps}
                gameState={game.currentGameState}
                shotDirection={game.shotDirection}
                assetsLoaded={assets.assetsLoaded}
                batImage={assets.batImageRef.current}
                batsmanImage={game.battingTeam === 'IND' || game.battingTeam === 'ENG' ? assets.batsmanImageRef.current : assets.dhBatsmanImageRef.current}
                ballImage={assets.ballImageRef.current}
                grassImage={assets.grassImageRef.current}
                battingTeam={game.battingTeam}
                bowlingTeam={game.bowlingTeam}
                bowlingTargetX={game.bowlingTargetX}
                userRole={game.userRole}
            />
            
            {showControls && (
                <MobileControls 
                    shotDirection={game.shotDirection}
                    onDirectionChange={game.setShotDirection}
                    onSwing={game.swingBat}
                    tutorialStep={game.tutorialStep}
                    userRole={game.userRole}
                />
            )}

            <Scoreboard
                score={game.score}
                targetScore={game.targetScore}
                ballsBowled={game.ballsBowled}
                totalBalls={game.totalBalls}
                wickets={game.wickets}
                maxWickets={game.maxWickets}
                battingTeam={game.battingTeam}
                bowlingTeam={game.bowlingTeam}
                userRole={game.userRole}
                innings={game.innings}
                firstInningsScore={game.firstInningsScore}
            />

            <ImpactMessage text={game.impactEffectText} visible={game.showImpactEffect} />
        </div>
    );
}

export default CricketGame;