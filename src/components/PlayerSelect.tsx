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
    { id: 'IND', name: 'INDIA', color: '#1E88E5', bg: 'rgba(30, 136, 229, 0.25)', text: '#90CAF9' },
    { id: 'AUS', name: 'AUSTRALIA', color: '#FDD835', bg: 'rgba(253, 216, 53, 0.25)', text: '#FFF59D' },
    { id: 'ENG', name: 'ENGLAND', color: '#E53935', bg: 'rgba(229, 57, 53, 0.25)', text: '#EF9A9A' },
    { id: 'NZ', name: 'NEW ZEALAND', color: '#B0BEC5', bg: 'rgba(176, 190, 197, 0.25)', text: '#ECEFF1' },
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
                backgroundColor: 'rgba(10, 10, 10, 0.95)',
                border: '4px solid #e7d86f',
                padding: '24px',
                maxWidth: '650px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                <h2 className="player-select-title" style={{ color: '#e7d86f', textDecoration: 'underline', marginBottom: '20px', fontSize: '1.6rem' }}>
                    MATCH SETUP
                </h2>

                {/* Section 1: Choose Teams */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#ababab', marginBottom: '10px', textTransform: 'uppercase' }}>
                        1. Select Teams
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        {/* Batting Team */}
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#e7d86f', marginBottom: '8px' }}>BATTING TEAM:</div>
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
                                            border: battingTeam === team.id ? `3px solid ${team.color}` : '2px solid #555',
                                            backgroundColor: battingTeam === team.id ? team.bg : 'rgba(20, 20, 20, 0.6)',
                                            color: battingTeam === team.id ? team.text : '#fff',
                                            fontSize: '0.75rem',
                                            padding: '8px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            boxShadow: 'none',
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
                            <div style={{ fontSize: '0.8rem', color: '#e7d86f', marginBottom: '8px' }}>BOWLING TEAM:</div>
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
                                            border: bowlingTeam === team.id ? `3px solid ${team.color}` : '2px solid #555',
                                            backgroundColor: bowlingTeam === team.id ? team.bg : 'rgba(20, 20, 20, 0.6)',
                                            color: bowlingTeam === team.id ? team.text : '#fff',
                                            fontSize: '0.75rem',
                                            padding: '8px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            boxShadow: 'none',
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
                    <h3 style={{ fontSize: '0.9rem', color: '#ababab', marginBottom: '10px', textTransform: 'uppercase' }}>
                        2. Select Your Role
                    </h3>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button
                            onClick={() => setUserRole('BAT')}
                            style={{
                                flex: 1,
                                border: userRole === 'BAT' ? '3px solid #4299e1' : '2px solid #555',
                                backgroundColor: userRole === 'BAT' ? 'rgba(66, 153, 225, 0.25)' : 'rgba(20, 20, 20, 0.6)',
                                color: userRole === 'BAT' ? '#63b3ed' : '#fff',
                                fontSize: '0.8rem',
                                padding: '12px',
                                boxShadow: 'none'
                            }}
                        >
                            PLAY AS BATTER (USER BATS)
                        </button>
                        <button
                            onClick={() => setUserRole('BOWL')}
                            style={{
                                flex: 1,
                                border: userRole === 'BOWL' ? '3px solid #e53e3e' : '2px solid #555',
                                backgroundColor: userRole === 'BOWL' ? 'rgba(229, 62, 62, 0.25)' : 'rgba(20, 20, 20, 0.6)',
                                color: userRole === 'BOWL' ? '#fc8181' : '#fff',
                                fontSize: '0.8rem',
                                padding: '12px',
                                boxShadow: 'none'
                            }}
                        >
                            PLAY AS BOWLER (USER BOWLS)
                        </button>
                    </div>
                </div>

                {/* Section 3: Match Length and Wickets (Scores options) */}
                <div style={{ marginBottom: '22px' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#ababab', marginBottom: '10px', textTransform: 'uppercase' }}>
                        3. Match & Score configuration
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        {/* Match Length */}
                        <div>
                            <div style={{ fontSize: '0.75rem', color: '#e7d86f', marginBottom: '6px' }}>MATCH OVER(S):</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px' }}>
                                {[6, 12, 30].map(val => (
                                    <button
                                        key={`balls-${val}`}
                                        onClick={() => setTotalBalls(val)}
                                        style={{
                                            border: totalBalls === val ? '2px solid #e7d86f' : '1px solid #555',
                                            backgroundColor: totalBalls === val ? 'rgba(231, 216, 111, 0.2)' : 'rgba(10, 10, 10, 0.8)',
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
                            <div style={{ fontSize: '0.75rem', color: '#e7d86f', marginBottom: '6px' }}>MAX WICKETS:</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '5px' }}>
                                {[1, 3, 5, 10].map(val => (
                                    <button
                                        key={`wickets-${val}`}
                                        onClick={() => setMaxWickets(val)}
                                        style={{
                                            border: maxWickets === val ? '2px solid #e7d86f' : '1px solid #555',
                                            backgroundColor: maxWickets === val ? 'rgba(231, 216, 111, 0.2)' : 'rgba(10, 10, 10, 0.8)',
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
                        <div style={{ fontSize: '0.75rem', color: '#e7d86f', marginBottom: '6px' }}>CHASE TARGET DIFFICULTY:</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '5px' }}>
                            {(['EASY', 'MEDIUM', 'HARD', 'RANDOM', 'UNLIMITED'] as MatchTargetMode[]).map(mode => (
                                <button
                                    key={`target-${mode}`}
                                    onClick={() => setTargetMode(mode)}
                                    style={{
                                        border: targetMode === mode ? '2px solid #e7d86f' : '1px solid #555',
                                        backgroundColor: targetMode === mode ? 'rgba(231, 216, 111, 0.2)' : 'rgba(10, 10, 10, 0.8)',
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
                        backgroundColor: '#48BB78',
                        color: '#fff',
                        fontSize: '1.1rem',
                        padding: '12px',
                        border: '3px solid #fff',
                        boxShadow: '4px 4px 0px #000',
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
