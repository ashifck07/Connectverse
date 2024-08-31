import React, { useState } from 'react';
import axios from 'axios';

const Forgotpassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/forgot-password', { email });
            setSuccess(response.data.message);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred. Please try again.');
            setSuccess(null);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Forgotpassword;