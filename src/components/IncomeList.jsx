import { Mail, Download, LoaderCircle } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";
import axiosConfig from "../util/axiosConfig";

const IncomeList = ({transactions, onDelete, onDownload, onEmail}) => {
    const [emailLoading, setEmailLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);

    const handleEmail = async () => {
        setEmailLoading(true);
        try{
            await onEmail();
        }finally{
            setEmailLoading(false);
        }
    }

    const handleDownload = async () => {
        setDownloadLoading(true);
        try{
            await onDownload();
        }finally{
            setDownloadLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income Sources</h5>
                <div className="flex items-center justify-end gap-2">
                    <button
                        disabled={emailLoading}
                        onClick={handleEmail} 
                        className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-purple-500 text-sm px-3 py-1.5 rounded-md transition-colors group cursor-pointer">
                        {emailLoading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin" />
                                Emailing...
                            </>
                        ) : (
                            <>
                                <Mail size={15} className="text-purple-400 group-hover:text-purple-500" />
                                Email
                            </>
                        )}
                    </button>
                    <button
                        disabled={downloadLoading}
                        onClick={handleDownload}
                        className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-purple-500 text-sm px-3 py-1.5 rounded-md transition-colors group cursor-pointer">
                        {downloadLoading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin" />
                                Downloading...
                            </>
                        ) : (
                            <>
                                <Download size={15} className="text-purple-400 group-hover:text-purple-500" />
                                Download
                            </>
                        )}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* display the incomes */}
                {transactions?.map((income) => (
                    <TransactionInfoCard
                        key={income.id}
                        title={income.name}
                        icon={income.icon}
                        date={moment(income.date).format('Do MMM YYYY')}
                        amount={income.amount}
                        type="income"
                        onDelete={() => onDelete(income.id)} 
                    />
                ))}
            </div>
        </div>
    )
}

export default IncomeList;