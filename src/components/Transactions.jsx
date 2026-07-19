import TransactionInfoCard from "./TransactionInfoCard";
import { ArrowRight } from "lucide-react";
import moment from "moment";

const Transactions = ({transactions, onMore, type, title}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">{title}</h5>
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
                        type={type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default Transactions;