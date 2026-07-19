import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util"
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({transactions, onAddIncome}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        console.log(result);
        setChartData(result);

        return () => {};
    }, [transactions]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">
                    Income Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0 5">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>
                <button
                    onClick={onAddIncome}
                    className="flex items-center gap-1 bg-green-200 text-green-800 px-4 py-2 rounded-lg font-medium hover:bg-green-300 transition-colors">
                        <Plus size={15} />
                        Add Income
                </button>
            </div>
            <div className="mt-10">
                {/* create line chart */}
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )
}

export default IncomeOverview;