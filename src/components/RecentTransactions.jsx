import TransactionInfoCard from "./TransactionInfoCard";
import { ArrowRight } from "lucide-react";
import moment from "moment";

const RecentTransactions = ({transactions, onMore}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
                <h4 className="text-lg">Recent Transactions</h4>

                <button
                    onClick={onMore}
                    className="flex items-center gap-1 bg-gray-200 text-black-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors cursor-pointer">
                        More <ArrowRight size={15} />
                </button>
            </div>
            <div className="mt-6">
                {transactions?.slice(0, 5)?.map(item => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("Do MM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentTransactions;