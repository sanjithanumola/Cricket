/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlayerCharacter, UserRole, MatchTargetMode, GameSettings } from '../types';

interface PlayerSelectProps {
    onSetupComplete: (settings: GameSettings) => void;
    indImage: HTMLImageElement;
    ausImage: HTMLImageElement;
}

const TEAMS: { id: PlayerCharacter; name: string; color: string; bg: string; text: string }[] = [
    { id: 'IND', name: 'INDIA', color: '#00f0ff', bg: 'rgba(0, 240, 255, 0.25)', text: '#00f0ff' },
    { id: 'AUS', name: 'AUSTRALIA', color: '#ffea00', bg: 'rgba(255, 234, 0, 0.25)', text: '#ffea00' },
    { id: 'ENG', name: 'ENGLAND', color: '#ff007f', bg: 'rgba(255, 0, 127, 0.25)', text: '#ff007f' },
    { id: 'NZ', name: 'NEW ZEALAND', color: '#00ffcc', bg: 'rgba(0, 255, 204, 0.25)', text: '#00ffcc' },
];

const PlayerSelect: React.FC<PlayerSelectProps> = ({ onSetupComplete, indImage, ausImage }) => {
    // Game Options States
    const [battingTeam, setBattingTeam] = useState<PlayerCharacter>('IND');
    const [bowlingTeam, setBowlingTeam] = useState<PlayerCharacter>('AUS');
    const [userRole, setUserRole] = useState<UserRole>('BAT');
    const [totalBalls, setTotalBalls] = useState<number>(12); // default 2 Overs
    const [maxWickets, setMaxWickets] = useState<number>(3);
    const [targetMode, setTargetMode] = useState<MatchTargetMode>('RANDOM');

    const handleConfirm = () => {
        onSetupComplete({
            battingTeam,
            bowlingTeam,
            userRole,
            totalBalls,
            maxWickets,
            targetMode,
        });
    };

    return (
        <div className="player-select-overlay" style={{ overflowY: 'auto', padding: '15px' }}>
            <div className="player-select-container" style={{
                backgroundColor: 'rgba(12, 6, 25, 0.95)',
                border: '4px solid #ff007f',
                boxShadow: '0 0 25px rgba(255, 0, 127, 0.4)',
                padding: '24px',
                maxWidth: '650px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                <h2 className="player-select-title" style={{ color: '#00f0ff', textShadow: '0 0 8px #00f0ff', marginBottom: '20px', fontSize: '1.6rem', textAlign: 'center', borderBottom: '2px dashed #ff007f', paddingBottom: '12px' }}>
                    MATCH SETUP
                </h2>

                {/* Section 1: Choose Teams */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#8c82a5', marginBottom: '10px', textTransform: 'uppercase' }}>
                        1. Select Teams
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        {/* Batting Team */}
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#ffea00', marginBottom: '8px' }}>BATTING TEAM:</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {TEAMS.map(team => (
                                    <button
                                        key={`bat-${team.id}`}
                                        onClick={() => {
                                            setBattingTeam(team.id);
                                            if (bowlingTeam === team.id) {
                                                setBowlingTeam(team.id === 'IND' ? 'AUS' : 'IND');
                                            }
                                        }}
                                        style={{
                                            border: battingTeam === team.id ? `3px solid ${team.color}` : '2px solid #3d2b63',
                                            backgroundColor: battingTeam === team.id ? team.bg : 'rgba(12, 6, 25, 0.6)',
                                            color: battingTeam === team.id ? team.text : '#fff',
                                            fontSize: '0.75rem',
                                            padding: '8px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            boxShadow: battingTeam === team.id ? `0 0 8px ${team.color}` : 'none',
                                            transition: 'none'
                                        }}
                                    >
                                        {team.name} ({team.id})
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Bowling Team */}
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#ffea00', marginBottom: '8px' }}>BOWLING TEAM:</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {TEAMS.map(team => (
                                    <button
                                        key={`bowl-${team.id}`}
                                        onClick={() => {
                                            setBowlingTeam(team.id);
                                            if (battingTeam === team.id) {
                                                setBattingTeam(team.id === 'IND' ? 'AUS' : 'IND');
                                            }
                                        }}
                                        style={{
                                            border: bowlingTeam === team.id ? `3px solid ${team.color}` : '2px solid #3d2b63',
                                            backgroundColor: bowlingTeam === team.id ? team.bg : 'rgba(12, 6, 25, 0.6)',
                                            color: bowlingTeam === team.id ? team.text : '#fff',
                                            fontSize: '0.75rem',
                                            padding: '8px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            boxShadow: bowlingTeam === team.id ? `0 0 8px ${team.color}` : 'none',
                                            transition: 'none'
                                        }}
                                    >
                                        {team.name} ({team.id})
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Choose Role */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#8c82a5', marginBottom: '10px', textTransform: 'uppercase' }}>
                        2. Select Your Role
                    </h3>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button
                            onClick={() => setUserRole('BAT')}
                            style={{
                                flex: 1,
                                border: userRole === 'BAT' ? '3px solid #00f0ff' : '2px solid #3d2b63',
                                backgroundColor: userRole === 'BAT' ? 'rgba(0, 240, 255, 0.25)' : 'rgba(12, 6, 25, 0.6)',
                                color: userRole === 'BAT' ? '#00f0ff' : '#fff',
                                fontSize: '0.8rem',
                                padding: '12px',
                                boxShadow: userRole === 'BAT' ? '0 0 10px rgba(0, 240, 255, 0.4)' : 'none'
                            }}
                        >
                            PLAY AS BATTER (USER BATS)
                        </button>
                        <button
                            onClick={() => setUserRole('BOWL')}
                            style={{
                                flex: 1,
                                border: userRole === 'BOWL' ? '3px solid #ff007f' : '2px solid #3d2b63',
                                backgroundColor: userRole === 'BOWL' ? 'rgba(255, 0, 127, 0.25)' : 'rgba(12, 6, 25, 0.6)',
                                color: userRole === 'BOWL' ? '#ff007f' : '#fff',
                                fontSize: '0.8rem',
                                padding: '12px',
                                boxShadow: userRole === 'BOWL' ? '0 0 10px rgba(255, 0, 127, 0.4)' : 'none'
                            }}
                        >
                            PLAY AS BOWLER (USER BOWLS)
                        </button>
                    </div>
                </div>

                {/* Section 3: Match Length and Wickets (Scores options) */}
                <div style={{ marginBottom: '22px' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#8c82a5', marginBottom: '10px', textTransform: 'uppercase' }}>
                        3. Match & Score configuration
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        {/* Match Length */}
                        <div>
                            <div style={{ fontSize: '0.75rem', color: '#ffea00', marginBottom: '6px' }}>MATCH OVER(S):</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px' }}>
                                {[6, 12, 30].map(val => (
                                    <button
                                        key={`balls-${val}`}
                                        onClick={() => setTotalBalls(val)}
                                        style={{
                                            border: totalBalls === val ? '2px solid #00f0ff' : '1px solid #3d2b63',
                                            backgroundColor: totalBalls === val ? 'rgba(0, 240, 255, 0.2)' : 'rgba(12, 6, 25, 0.8)',
                                            color: '#fff',
                                            fontSize: '0.7rem',
                                            padding: '6px',
                                            boxShadow: 'none'
                                        }}
                                    >
                                        {val / 6 === 5 ? '5 Overs' : `${val / 6} Over`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Max Wickets */}
                        <div>
                            <div style={{ fontSize: '0.75rem', color: '#ffea00', marginBottom: '6px' }}>MAX WICKETS:</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '5px' }}>
                                {[1, 3, 5, 10].map(val => (
                                    <button
                                        key={`wickets-${val}`}
                                        onClick={() => setMaxWickets(val)}
                                        style={{
                                            border: maxWickets === val ? '2px solid #00f0ff' : '1px solid #3d2b63',
                                            backgroundColor: maxWickets === val ? 'rgba(0, 240, 255, 0.2)' : 'rgba(12, 6, 25, 0.8)',
                                            color: '#fff',
                                            fontSize: '0.7rem',
                                            padding: '6px',
                                            boxShadow: 'none'
                                        }}
                                    >
                                        {val}W
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Target Score difficulty mode */}
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#ffea00', marginBottom: '6px' }}>CHASE TARGET DIFFICULTY:</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '5px' }}>
                            {(['EASY', 'MEDIUM', 'HARD', 'RANDOM', 'UNLIMITED'] as MatchTargetMode[]).map(mode => (
                                <button
                                    key={`target-${mode}`}
                                    onClick={() => setTargetMode(mode)}
                                    style={{
                                        border: targetMode === mode ? '2px solid #00f0ff' : '1px solid #3d2b63',
                                        backgroundColor: targetMode === mode ? 'rgba(0, 240, 255, 0.2)' : 'rgba(12, 6, 25, 0.8)',
                                        color: '#fff',
                                        fontSize: '0.62rem',
                                        padding: '6px 3px',
                                        boxShadow: 'none',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                <button
                    onClick={handleConfirm}
                    style={{
                        width: '100%',
                        backgroundColor: '#ff007f',
                        color: '#fff',
                        fontSize: '1.1rem',
                        padding: '12px',
                        border: '3px solid #00f0ff',
                        boxShadow: '4px 4px 0px #00f0ff',
                        textTransform: 'uppercase',
                        marginTop: '10px'
                    }}
                >
                    CONFIRM & PLAY!
                </button>
            </div>
        </div>
    );
};

export default PlayerSelect;
