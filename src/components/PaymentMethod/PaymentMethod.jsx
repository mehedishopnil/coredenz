import React, { useState } from 'react';
import { FaMobileAlt, FaMoneyBillWave, FaUniversity, FaCheckCircle } from 'react-icons/fa';

const PaymentMethod = ({ selectedMethod, onSelectMethod, onTransactionIdChange }) => {
    const [transactionId, setTransactionId] = useState('');

    const handleTransactionIdChange = (e) => {
        const value = e.target.value;
        setTransactionId(value);
        onTransactionIdChange(value);
    };

    return (
        <div className="space-y-4">
            {/* Bkash Payment Option */}
            <div 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedMethod === 'bkash' ? 'border-[#E3106D] bg-[#E3106D10]' : 'border-gray-300 hover:border-blue-300'}`}
                onClick={() => onSelectMethod('bkash')}
            >
                <div className="flex items-center">
                    <div className="bg-[#E3106D] text-white p-2 rounded-full mr-3">
                        <FaMobileAlt className="text-xl" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-medium">Bkash</h3>
                        <p className="text-sm text-gray-600">Mobile Banking Payment</p>
                    </div>
                    {selectedMethod === 'bkash' && (
                        <FaCheckCircle className="text-green-500 text-xl" />
                    )}
                </div>

                {selectedMethod === 'bkash' && (
                    <div className="mt-4 pl-11">
                        <div className="bg-[#f5afcf63] p-3 rounded-md mb-3">
                            <p className="font-medium text-[#E3106D]">Payment Instructions:</p>
                            <ol className="list-decimal list-inside text-sm text-[#E3106D] space-y-1 mt-1">
                                <li>Go to your Bkash Mobile Menu</li>
                                <li>Select "Send Money"</li>
                                <li>Enter our Bkash Number: <span className="font-bold">01316265634</span></li>
                                <li>Enter the amount</li>
                                <li>Enter your PIN to confirm</li>
                            </ol>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="bkashTransactionId" className="block text-sm font-medium text-gray-700 mb-1">
                                Bkash Transaction ID (TrxID)
                            </label>
                            <input
                                type="text"
                                id="bkashTransactionId"
                                value={transactionId}
                                onChange={handleTransactionIdChange}
                                placeholder="Enter your Bkash TrxID"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Please enter the 10-digit transaction ID from your Bkash payment</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Nagad Payment Option */}
            <div 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedMethod === 'nagad' ? 'border-[#ED1C24] bg-[#ed1c2310]' : 'border-gray-300 hover:border-green-300'}`}
                onClick={() => onSelectMethod('nagad')}
            >
                <div className="flex items-center">
                    <div className="bg-[#ed1c23] text-white p-2 rounded-full mr-3">
                        <FaMobileAlt className="text-xl" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-medium">Nagad</h3>
                        <p className="text-sm text-gray-600">Mobile Banking Payment</p>
                    </div>
                    {selectedMethod === 'nagad' && (
                        <FaCheckCircle className="text-green-500 text-xl" />
                    )}
                </div>

                {selectedMethod === 'nagad' && (
                    <div className="mt-4 pl-11">
                        <div className="bg-[#ed1c2317] p-3 rounded-md mb-3">
                            <p className="font-medium text-[#ED1C24]">Payment Instructions:</p>
                            <ol className="list-decimal list-inside text-sm text-[#ED1C24] space-y-1 mt-1">
                                <li>Go to your Nagad Mobile Menu</li>
                                <li>Select "Send Money"</li>
                                <li>Enter our Nagad Number: <span className="font-bold">01316265634</span></li>
                                <li>Enter the amount</li>
                                <li>Enter your PIN to confirm</li>
                            </ol>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="nagadTransactionId" className="block text-sm font-medium text-gray-700 mb-1">
                                Nagad Transaction ID (TrxID)
                            </label>
                            <input
                                type="text"
                                id="nagadTransactionId"
                                value={transactionId}
                                onChange={handleTransactionIdChange}
                                placeholder="Enter your Nagad TrxID"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Please enter the transaction ID from your Nagad payment</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bank Transfer Option */}
            <div 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedMethod === 'bank' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                onClick={() => onSelectMethod('bank')}
            >
                <div className="flex items-center">
                    <div className="bg-purple-500 text-white p-2 rounded-full mr-3">
                        <FaUniversity className="text-xl" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-medium">Bank Transfer</h3>
                        <p className="text-sm text-gray-600">Direct Bank Transaction</p>
                    </div>
                    {selectedMethod === 'bank' && (
                        <FaCheckCircle className="text-green-500 text-xl" />
                    )}
                </div>

                {selectedMethod === 'bank' && (
                    <div className="mt-4 pl-11">
                        <div className="bg-purple-100 p-3 rounded-md mb-3">
                            <p className="font-medium text-purple-800">Bank Account Details:</p>
                            <ul className="text-sm text-purple-700 space-y-1 mt-1">
                                <li><span className="font-semibold">Bank:</span> Islami Bank Bangladesh Ltd</li>
                                <li><span className="font-semibold">A/C Name:</span> SK Mehedi Hasan</li>
                                <li><span className="font-semibold">A/C Number:</span> 20501860203869010</li>
                                <li><span className="font-semibold">Branch:</span> Kaliganj, Satkhira</li>
                            </ul>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="bankTransactionId" className="block text-sm font-medium text-gray-700 mb-1">
                                Bank Transaction ID
                            </label>
                            <input
                                type="text"
                                id="bankTransactionId"
                                value={transactionId}
                                onChange={handleTransactionIdChange}
                                placeholder="Enter your bank transaction ID"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Please enter the transaction ID/reference number from your bank payment</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Cash on Delivery Option */}
            <div 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedMethod === 'cod' ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-300'}`}
                onClick={() => onSelectMethod('cod')}
            >
                <div className="flex items-center">
                    <div className="bg-orange-500 text-white p-2 rounded-full mr-3">
                        <FaMoneyBillWave className="text-xl" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-medium">Cash on Delivery</h3>
                        <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                    {selectedMethod === 'cod' && (
                        <FaCheckCircle className="text-green-500 text-xl" />
                    )}
                </div>

                {selectedMethod === 'cod' && (
                    <div className="mt-4 pl-11">
                        <div className="bg-orange-100 p-3 rounded-md">
                            <p className="text-sm text-orange-700">
                                You'll pay the exact amount to our delivery agent when you receive your order.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentMethod;