import React from 'react';
import { useSelector } from 'react-redux';
import RuleCard from './RuleCard';
import {v4 as uuidv4} from "uuid";

export default function UserRules() {
    const {rules} = useSelector(state => state.sheetData);

    return (
        <div>
            {
                rules.map(rule => {
                    return (
                        <RuleCard key={uuidv4()} singleRule={rule} />
                    )
                })
            }
        </div>
    )
}
