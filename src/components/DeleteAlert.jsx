import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({content, onDelete}) => {

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try{
            await onDelete();
        }finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <p className="text-sm">{content}</p>
            <div className="flex justify-end mt-6">
                <button
                    onClick={() => handleDelete()}
                    disabled={loading}
                    type="button" 
                    className="flex items-center gap-1 bg-red-200 text-red-800 px-4 py-2 rounded-lg font-medium hover:bg-red-300 transition-colors">
                        {loading ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animated-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                Delete
                            </>
                        )}
                </button>
            </div>
        </div>
    )
}
export default DeleteAlert;