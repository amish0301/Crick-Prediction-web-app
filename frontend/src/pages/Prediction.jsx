import { useEffect, useState } from "react";
import socket from "../utils/socket";
import { useSearchParams } from "react-router-dom";
import { MAKE_PREDICTION } from "../utils/Events";
import { useSelector } from 'react-redux'


const Prediction = () => {
    const [searchparams] = useSearchParams();
    const matchId = searchparams.get("matchId");
    const userId = searchparams.get("userId");

    const [prediction, setPrediction] = useState("");
    const [joined, setJoined] = useState(false);
    const [predictionHistory, setPredictionHistory] = useState([]);
    const [feedbackMsg, setFeedbackMsg] = useState("");
    const { user } = useSelector((state) => state.user);
    const userName = user.name

    useEffect(() => {
        if (matchId && userId) {
            socket.emit("JOIN_ROOM", matchId, userId);
            setJoined(true);
        }
    }, [matchId, userId]);

    const handlePredictionSelect = (outcome) => {
        setPrediction(outcome);
    };

    const handlePredictionSubmit = () => {
        if (prediction.trim()) {
            const newPrediction = {
                event: prediction,
                time: new Date().toLocaleTimeString(),
            };

            socket.emit(MAKE_PREDICTION, {
                matchId,
                userId,
                prediction,
            });

            setPredictionHistory((prev) => {
                const updated = [newPrediction, ...prev];
                return updated.slice(0, 3); // keep only last 3 predictions
            });

            setFeedbackMsg("✅ Prediction submitted!");
            setPrediction("");
            setTimeout(() => setFeedbackMsg(""), 3000);
        } else {
            setFeedbackMsg("❌ Please select a prediction");
            setTimeout(() => setFeedbackMsg(""), 3000);
        }
    };


    const [page, setPage] = useState(0);
    const batchSize = 3;
    const totalBatches = Math.ceil(predictionHistory.length / batchSize);
    const start = page * batchSize;
    const end = start + batchSize;
    const currentBatch = predictionHistory.slice(start, end);


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4 py-8">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-blue-700">Cricket Match Prediction</h1>
                    <p className="text-gray-600 mt-1">Match ID: <span className="font-semibold">{matchId}</span></p>
                    <p className="text-gray-500 text-sm">User Name: {userName}</p>
                    {joined && (
                        <p className="text-green-600 text-sm mt-2">🎉 Joined Room Successfully</p>
                    )}
                </div>

                <div className="space-y-4">
                    <label className="block font-medium text-gray-700">Select Prediction</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["Dot Ball", "Single", "Double", "Four", "Six", "Wicket", "Wide", "No Ball"].map((outcome) => (
                            <button
                                key={outcome}
                                onClick={() => handlePredictionSelect(outcome)}
                                className={`${prediction === outcome ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                                    } p-3 rounded-lg shadow-md hover:bg-blue-500 transition duration-200`}
                            >
                                {outcome}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handlePredictionSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg w-full transition"
                    >
                        Submit Prediction
                    </button>

                    {feedbackMsg && (
                        <div className="text-center text-sm font-medium mt-2 text-gray-700">
                            {feedbackMsg}
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Prediction History</h3>

                    {predictionHistory.length === 0 ? (
                        <p className="text-sm text-gray-500">No predictions yet.</p>
                    ) : (
                        <div>
                            <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                {currentBatch.map((p, index) => (
                                    <li
                                        key={start + index}
                                        className="bg-gray-100 rounded-lg px-4 py-2 flex justify-between text-sm"
                                    >
                                        <span>{p.event}</span>
                                        <span className="text-gray-500">{p.time}</span>
                                    </li>
                                ))}
                            </ul>
                            {totalBatches > 1 && (
                                <button
                                    onClick={() => setPage((prevPage) => (prevPage + 1) % totalBatches)}
                                    className="mt-2 text-blue-500 hover:underline text-sm"
                                >
                                    Show next predictions
                                </button>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Prediction;