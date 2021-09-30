import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { addRule } from "../Table/tableSlice";
import UserRules from "./UserRules";

const FILTER_COLORS = [
    { name: "yellow" },
    { name: "gray" },
    { name: "green" },
    { name: "blue" },
    { name: "red" },
];

export default function FormatRules() {
    const [showAddRule, setShowAddRule] = useState(false);
    const { rules } = useSelector((state) => state.sheetData);
    const dispatch = useDispatch();

    const [ruleInfo, setRuleInfo] = useState({
        condition: "",
        fieldName: "",
        value: "",
        color: "yellow", // default is gray
    });

    function createRule(event) {
        event.preventDefault();

        const rule_id = uuidv4();
        let updatedRule = { ...ruleInfo };
        updatedRule.id = rule_id;

        dispatch(addRule(updatedRule));

        // reset fields and hide create rule
        cancelRule();

    }
    function cancelRule() {
        setRuleInfo({
            condition: "",
            fieldName: "",
            value: "",
            color: "",
        });
        setShowAddRule(false);
    }
    function handleInputChange(event) {
        let inputName = event.target.name;
        setRuleInfo((prevRule) => {
            return {
                ...prevRule,
                [inputName]: event.target.value,
            };
        });
    }
    function handleColorChange(colorName) {
        setRuleInfo((prevRule) => {
            return {
                ...prevRule,
                color: colorName,
            };
        });
    }

    return (
        <div className="flex flex-col flex-wrap mt-8 rounded p-2">
            <h3 className="text-lg text-gray-400 mb-2">
                Conditional Formatting
            </h3>

            {!showAddRule && rules.length < 1 ? (
                <div className="mb-2 border border-gray-500 rounded px-2 py-6 flex flex-col items-center justify-center text-sm text-gray-400">
                    <span className="text-3xl font-semibold text-gray-600 mb-2">
                        {" "}
                        {"( •_•)>"}
                    </span>
                    No rules specified.
                </div>
            ) : (
                !showAddRule && <UserRules />
            )}
            {showAddRule ? (
                <div className="">
                    <form onSubmit={createRule} className="flex flex-col">
                        <label
                            htmlFor="fieldName"
                            className="text-sm text-gray-400"
                        >
                            Field
                        </label>
                        <select
                            onChange={handleInputChange}
                            name="fieldName"
                            id="fieldName"
                            placeholder="select field"
                            className="mb-2"
                            required
                        >
                            <option
                                value=""
                                className="text-gray-400"
                                defaultValue
                            >
                                Select field
                            </option>
                            <option value="loadtime">Load Time</option>
                            <option value="type">Type</option>
                        </select>

                        <label
                            htmlFor="condition"
                            className="text-sm text-gray-400"
                        >
                            Condition
                        </label>
                        <select
                            onChange={handleInputChange}
                            name="condition"
                            id="condition"
                            placeholder="select field"
                            className="mb-2"
                            required
                        >
                            <option
                                value=""
                                className="text-gray-400"
                                defaultValue
                            >
                                Select condition
                            </option>
                            <option value="gt">greater than</option>
                            <option value="lt">less than</option>
                            <option value="gte">greater than equal to</option>
                            <option value="lte">less than equal to</option>
                            <option value="eq">equal to</option>
                        </select>

                        <label
                            htmlFor="value"
                            className="text-sm text-gray-400"
                        >
                            Value
                        </label>
                        <input
                            type="text"
                            id="value"
                            name="value"
                            value={ruleInfo.value}
                            onChange={handleInputChange}
                            placeholder="Enter a value"
                            className="mb-4"
                            required
                        />

                        <div className="mb-4">
                            <label className="text-gray-400 text-sm">
                                Cell Color
                            </label>
                            <ul className="flex">
                                {FILTER_COLORS.map((colorChoice) => {
                                    return (
                                        <li
                                            key={colorChoice.name}
                                            className={`p-2 rounded-full ${
                                                ruleInfo.color ===
                                                colorChoice.name
                                                    ? "bg-gray-700"
                                                    : ""
                                            }`}
                                            title={colorChoice.name}
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleColorChange(
                                                        colorChoice.name
                                                    )
                                                }
                                                className={
                                                    "block border h-6 w-6 rounded-full" +
                                                    ` bg-${colorChoice.name}-400 border-${colorChoice.name}-300 border-2`
                                                }
                                            ></button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <button className="block bg-blue-700 hover:bg-blue-900 text-blue-100 p-2 rounded mb-2">
                            Create rule
                        </button>
                        <button
                            type="button"
                            className="block bg-gray-700 hover:bg-gray-800 text-gray-100 p-2 rounded"
                            onClick={cancelRule}
                        >
                            Show rules
                        </button>
                    </form>
                </div>
            ) : (
                <button
                    onClick={() => setShowAddRule(true)}
                    className="block bg-blue-700 hover:bg-blue-900 text-blue-100 p-2 rounded"
                >
                    Add a rule
                </button>
            )}
        </div>
    );
}
