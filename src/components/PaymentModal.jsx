import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';

export default function PaymentModal({ isOpen, setIsOpen, total, onPaymentComplete }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentComplete();
      setIsOpen(false);
      alert('Payment successful! Your booking is confirmed.');
    }, 2000);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => !processing && setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
              >
                Complete Payment
              </Dialog.Title>

              <div className="mt-4">
                <div className="flex space-x-4 mb-6">
                  <button
                    className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
                      paymentMethod === 'card'
                        ? 'bg-airbnb-red text-white'
                        : 'border border-gray-300 dark:border-gray-600'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <FaCreditCard />
                    <span>Card</span>
                  </button>
                  <button
                    className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
                      paymentMethod === 'paypal'
                        ? 'bg-airbnb-red text-white'
                        : 'border border-gray-300 dark:border-gray-600'
                    }`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <FaPaypal />
                    <span>PayPal</span>
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  {paymentMethod === 'card' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Card Number
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="1234 5678 9012 3456"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-airbnb-red focus:ring-airbnb-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="MM/YY"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-airbnb-red focus:ring-airbnb-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            CVV
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="123"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-airbnb-red focus:ring-airbnb-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-300">
                        You will be redirected to PayPal to complete your payment.
                      </p>
                    </div>
                  )}

                  <div className="mt-6">
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600 dark:text-gray-300">Total Amount:</span>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${total}
                      </span>
                    </div>
                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-airbnb-red text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-airbnb-red disabled:opacity-50"
                    >
                      {processing ? 'Processing...' : 'Pay Now'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}