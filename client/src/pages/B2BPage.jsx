import React from "react";

const B2BPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 text-green-800 px-4 relative overflow-hidden">
      {/* Floating Leaf Background Animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="animate-leaf float-leaf opacity-20 text-green-300 absolute left-20 top-10 text-7xl">🍃</div>
        <div className="animate-leaf float-leaf opacity-20 text-green-300 absolute right-24 top-40 text-6xl">🌿</div>
        <div className="animate-leaf float-leaf opacity-20 text-green-300 absolute left-36 bottom-10 text-7xl">🍀</div>
      </div>

      {/* Main Content */}
      <div className="z-10 text-center">
        <h1 className="text-5xl font-bold mb-4 animate-bounce text-green-700">🚧 B2B Portal</h1>
        <p className="text-lg font-medium mb-2">Server is currently under maintenance.</p>
        <p className="text-md mb-6">This section will be launching soon with exciting B2B features.</p>

        <div className="bg-green-200 text-green-800 rounded-lg px-6 py-3 shadow-md inline-block text-sm">
          Please contact admin <strong>Mr. AKS</strong> for further details.
        </div>

        <div className="mt-8">
          <a
            href="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow transition duration-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default B2BPage;
