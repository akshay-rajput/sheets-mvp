import React, { useState, useEffect } from "react";
import { removeRule } from "../Table/tableSlice";
import { useDispatch } from "react-redux";

const BORDER_COLORS = {
    yellow: "border-yellow-400",
    gray: "border-gray-400",
    green: "border-green-400",
    blue: "border-blue-400",
    red: "border-red-400",
}

export default function RuleCard({ singleRule }) {
    const dispatch = useDispatch();
    const [conditionOfRule, setConditionOfRule] = useState("");

    useEffect(() => {
        switch (singleRule.condition) {
            case "gt":
                setConditionOfRule("greater than");
                break;
            case "gte":
                setConditionOfRule("greater than or equal to");
                break;
            case "lt":
                setConditionOfRule("lower than");
                break;
            case "lte":
                setConditionOfRule("lower than or equal to");
                break;
            case "eq":
                setConditionOfRule("equal to");
                break;
            default:
                break;
        }
    }, []);

    function removeTheRule() {
        dispatch(removeRule(singleRule));
    }

    return (
        <div
            className={
                "flex justify-between rounded border border-l-8 mb-2" +
                ` ${BORDER_COLORS[singleRule.color]}`
            }
        >
            <p className={`p-2`}>
                "{singleRule.fieldName}" is {conditionOfRule} "
                {singleRule.value}"
            </p>
            <button
                onClick={removeTheRule}
                className="font-bold text-md border-l p-2 text-red-300 hover:bg-red-600 hover:text-white"
                title="remove rule"
            >
                x
            </button>
        </div>
    );
}
