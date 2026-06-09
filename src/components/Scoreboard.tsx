/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlayerCharacter, UserRole } from '../types';

interface ScoreboardProps {
    score: number;
    targetScore: number;
    ballsBowled: number;
    totalBalls: number;
    wickets: number;
    maxWickets: number;
    battingTeam: PlayerCharacter;
    bowlingTeam: PlayerCharacter;
    userRole: UserRole;
    innings?: number;
    firstInningsScore?: number | null;
}

const Scoreboard: React.FC<ScoreboardProps> = ({
    score,
    targetScore,
    ballsBowled,
    totalBalls,
    wickets,
    maxWickets,
    battingTeam,
    bowlingTeam,
    userRole,
    innings = 1,
    firstInningsScore = null
}) => {
    const runsToWin = Math.max(0, targetScore - score);
    const ballsLeft = totalBalls - ballsBowled;

    // Convert balls bowled to cricket over notation, e.g. 8 balls is 1.2 overs
    const oversText = `${Math.floor(ballsBowled / 6)}.${ballsBowled % 6}`;
    const totalOversText = `${Math.floor(totalBalls / 6)}.${totalBalls % 6}`;

    return (
        <div className="scoreboard" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px 20px',
            padding: '12px 18px',
            backgroundColor: '#111',
            borderTop: '3px solid #e7d86f'
        }}>
            {/* Row 1: Batting Team Score & Target Score */}
            <div className="score-item">
                <span className="score-label" style={{ color: '#90CAF9' }}>
                    {battingTeam} {userRole === 'BAT' ? '(YOU)' : '(AI)'}
                </span>
                <span className="score-value" style={{ color: '#fff', fontSize: '1.4rem' }}>
                    {score}/{wickets}<span style={{ fontSize: '0.8rem', color: '#666' }}>({maxWickets}w)</span>
                </span>
            </div>
            
            <div className="score-item">
                <span className="score-label" style={{ color: '#FFF59D' }}>
                    {targetScore > 0 ? `TARGET (${bowlingTeam})` : 'SETTING TARGET'}
                </span>
                <span className="score-value" style={{ color: '#e7d86f', fontSize: '1.4rem' }}>
                    {targetScore > 0 ? targetScore : '1st INN'}
                </span>
            </div>

            {/* Row 2: Overs Bowled / Balls Left & Target remaining */}
            <div className="score-item">
                <span className="score-label" style={{ color: '#ababab' }}>
                    OVERS
                </span>
                <span className="score-value" style={{ fontSize: '1.2rem', color: '#fff' }}>
                    {oversText}<span style={{ fontSize: '0.8rem', color: '#999' }}> / {totalOversText}</span>
                </span>
            </div>

            <div className="score-item">
                <span className="score-label" style={{ color: '#ef5350' }}>
                    {targetScore > 0 ? 'TO WIN' : 'INNINGS'}
                </span>
                <span className="score-value" style={{ fontSize: '1.2rem', color: targetScore > 0 ? '#ef5350' : '#fff' }}>
                    {targetScore > 0 ? `${runsToWin} runs` : `${innings}st of 2`}
                </span>
            </div>
        </div>
    );
};

export default Scoreboard;
