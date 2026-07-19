import CustomPieChart from "./CustomPieChart.jsx";
import { addThousandsSeparator } from "../util/util.js" 

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

    const colors = ["#59168B", "#a0090e", "#016630"]

    const balanceData = [
        { name: "Total Expenses", amount: totalExpense },
        { name: "Total Income", amount: totalIncome },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Financial Overview</h5>
            </div>

            <CustomPieChart 
                data={balanceData}
                label="Total Balance"
                totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
                colors={colors}
                showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview;