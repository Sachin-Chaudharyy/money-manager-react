import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;

        return (
            <div className="bg-white shadow-md rounded-lg p-3 border border-gray-200 min-w-[160px]">
                {/* Date */}
                <p className="text-xs font-semibold text-gray-900">{data.month}</p>

                <div className="border-t border-gray-200 my-2"></div>

                {/* Total */}
                <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-900">Total:</span>
                    <span className="text-xs text-purple-600 font-medium">
                        ₹{data.totalAmount}
                    </span>
                </div>

                <div className="border-t border-gray-200 my-2"></div>

                {/* Details */}
                <p className="text-xs font-semibold text-gray-900 mb-1">Details:</p>
                <div className="flex flex-col gap-1">
                    {data.items?.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-gray-600">
                                {item.name}:
                            </span>
                            <span className="text-xs text-gray-500 font-medium">
                                ₹{item.amount}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
}

const CustomLineChart = ({ data }) => {
    return (
        <div className="bg-white">
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#875cf5" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "#9ca3af" }}
                        stroke="#e5e7eb"
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: "#9ca3af" }}
                        stroke="#e5e7eb"
                    />
                    <Tooltip content={<CustomTooltip />} />

                    <Area
                        type="monotone"
                        dataKey="totalAmount"
                        stroke="#875cf5"
                        strokeWidth={2}
                        fill="url(#incomeGradient)"
                        dot={{ r: 3, fill: "#875cf5" }}
                        activeDot={{ r: 5 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CustomLineChart;